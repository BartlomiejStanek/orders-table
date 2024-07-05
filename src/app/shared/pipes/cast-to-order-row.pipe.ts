import { Pipe, PipeTransform } from "@angular/core";
import { OrderRow } from "../../orders/model/types/order-row";

@Pipe({
  name: 'castToOrderRow',
})
export class CastToOrderRowPipe implements PipeTransform {
  public transform(value: unknown): OrderRow {
    return value as OrderRow;
  }
}
