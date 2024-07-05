import { Pipe, PipeTransform } from "@angular/core";
import { OrderGroup } from "../../orders/model/order-group";

@Pipe({
  name: 'castToOrderGroup',
})
export class CastToOrderGroupPipe implements PipeTransform {
  public transform(value: unknown): OrderGroup {
    return value as OrderGroup;
  }
}
