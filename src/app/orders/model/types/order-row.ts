import { BehaviorSubject, Subject } from "rxjs";
import { Side } from "../../../api/model/enums/side";


export interface OrderRow {
  orderId?: number,
  symbol?: string,
  side?: Side,
  openTime?: Date,
  openPrice: number,
  swap: number,
  size: number,
  profit: BehaviorSubject<number>
}
