import { OrderRow } from "./order-row";

export interface OrderTableData extends OrderRow {
  group: OrderRow[];
  isOpen: boolean;
}
