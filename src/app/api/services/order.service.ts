import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { OrderData } from '../model/types/order-data';
import { OrderGroup } from '../../orders/model/order-group';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly _httpClinet: HttpClient) { }

  public getOrders(): Observable<OrderGroup[]> {
    return this._httpClinet.get<OrderData>('https://geeksoft.pl/assets/order-data.json').pipe(
      map((orders) => {
        const ordersMap = new Map<string, OrderGroup>();
        orders.data.forEach((order) => {
          const orderGroup: OrderGroup = ordersMap.get(order.symbol) || new OrderGroup(order.symbol);
          orderGroup.addToGroup(order);
          ordersMap.set(order.symbol, orderGroup);
        });
        return Array.from(ordersMap.values());
      })
    );
  }
}
