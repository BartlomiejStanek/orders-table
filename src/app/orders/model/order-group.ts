import { webSocket } from "rxjs/webSocket";
import { OrderRow } from "./types/order-row";
import { OrderTableData } from "./types/order-table-data";
import { Subscription, BehaviorSubject } from "rxjs";
import { MULTIPLAYER } from "./const/multiplayer";
import { Side } from "../../api/model/enums/side";
import { OrderSchema } from "../../api/model/types/order-schema";
import { CurrentPrice } from "./types/current-price";
import { CurrentPriceData } from "./types/current-price-data";


export class OrderGroup implements OrderTableData{
  private readonly _subject = webSocket<CurrentPriceData>('wss://webquotes.geeksoft.pl/websocket/quotes');
  private readonly _sub: Subscription = new Subscription();
  private readonly _group: OrderRow[] = [];
  private readonly _multiplayer: number;
  private readonly _profit: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public get group(): OrderRow[] {
    return this._group;
  }

  public get symbol(): string {
    return this._symbol;
  }

  public get size(): number {
    return this._size;
  }

  public get openPrice(): number {
    return this._openPrice;
  }

  public get swap(): number {
    return this._swap;
  }

  public get profit(): BehaviorSubject<number> {
    return this._profit;
  }

  constructor(
    private _symbol: string,
    private _size: number = 0,
    private _openPrice: number = 0,
    private _swap: number = 0,
    public isOpen: boolean = false) {
      this._multiplayer = Math.pow(10, MULTIPLAYER[_symbol]);
  }

  public addToGroup(order: OrderSchema): void {
    this._size += order.size;
    this._openPrice = this._group.length > 1 ? (order.openPrice + this._openPrice)/this._group.length : order.openPrice;
    this._swap += order.swap;
    const orderRow: OrderRow = {...order, orderId: order.id, profit: new BehaviorSubject<number>(0), openTime: new Date(order.openTime), symbol: undefined};
    orderRow.profit.next(this._calculateProfit(order.closePrice, orderRow));
    this._profit.next(this._group.length > 1 ? (orderRow.profit.value + this._profit.value)/this._group.length : orderRow.profit.value);
    this._group.push(orderRow);
  }

  public startListening(): void{
    this._subject.next({
      'p': '/subscribe/addlist',
      'd': [this._symbol]
      });
    this._sub.add(this._subject.subscribe(data => {
      const prices = data.d as CurrentPrice[];
      const findPrice = prices?.find((price) => price.s === this._symbol);
      if(findPrice){
        this._group.forEach((order) => {
          order.profit.next(this._calculateProfit(findPrice.b, order));
        });
        this._profit.next(this._group.reduce((acc, order) => acc + order.profit.value, 0)/this._group.length);
      }
    }));
  }

  public stopListening(): void{
    this._subject.next({
      'p': '/subscribe/removelist',
      'd': [this._symbol]
      });
    this._sub.unsubscribe();
    this._subject.complete();
  }

  private _calculateProfit(price: number, order: OrderRow): number {
    return (price - order.openPrice) * this._multiplayer * (order.side === Side.buy ? 1 : -1)/100; // Math.floor(*100)/100;
  }

  public closeOrders(orderIds: (number | undefined)[]): void{
    orderIds.forEach((id) => {
      if(id === undefined){
        return
      };
      const orderIndex = this._group.findIndex((orderRow) => orderRow.orderId === id);
      this._group.splice(orderIndex, 1);
    });
    if(this._group.length === 0){
      this.stopListening();
      return;
    }
    this._size = this._group.reduce((acc, order) => acc + order.size, 0);
    this._openPrice = this._group.reduce((acc, order) => acc + order.openPrice, 0)/this._group.length;
    this._swap = this._group.reduce((acc, order) => acc + order.swap, 0);
    this._profit.next(this._group.reduce((acc, order) => acc + order.profit.value, 0)/this._group.length);
  }
}
