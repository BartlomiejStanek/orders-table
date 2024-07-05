import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderRow } from '../../model/types/order-row';
import { OrderGroup } from '../../model/order-group';
import { SharedModule } from '../../../shared/shared.module';

export interface OrderColumnDefinition {
  fieldName: string;
  expandFieldName: string;
  label?: string;
}

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, SharedModule],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
  animations: [
    trigger('expandGroup', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersTableComponent implements OnInit, OnDestroy {
  public displayedColumns: OrderColumnDefinition[] = [
    {fieldName: 'expand', expandFieldName: 'expand-icon'},
    {fieldName: 'symbol', label: 'Symbol', expandFieldName: 'expand-symbol'},
    {fieldName: 'orderId', label: 'Order ID', expandFieldName: 'expand-orderId'},
    {fieldName: 'side', label: 'Side', expandFieldName: 'expand-side'},
    {fieldName: 'size', label: 'Size', expandFieldName: 'expand-size'},
    {fieldName: 'openTime', label: 'Open Time', expandFieldName: 'expand-openTime'},
    {fieldName: 'openPrice', label: 'Open Price', expandFieldName: 'expand-openPrice'},
    {fieldName: 'swap', label: 'Swap' , expandFieldName: 'expand-swap'},
    {fieldName: 'profit', label: 'Profit', expandFieldName: 'expand-profit'},
    {fieldName: 'closeOrder', expandFieldName: 'expand-closeOrder'},
  ];
  public columnsToDisplay: string[] = [...this.displayedColumns.map((column) => column.fieldName)];
  public columnsToDisplayExpand: string[] = [...this.displayedColumns.map((column) => column.expandFieldName)];
  @Input() public orders: OrderGroup[] = [];

  constructor(private _snackBar: MatSnackBar){
  }
  ngOnDestroy(): void {
    this.orders.forEach((order) => {
      order.stopListening();
    });
  }
  ngOnInit(): void {
    this.orders.forEach((order) => {
      order.startListening();
    });
  }

  public closeOrders(orders: OrderRow[], symbol: string, deleteGroup: boolean = false): void{
    const findOrder = this.orders.find((orderTableData) => orderTableData.symbol === symbol);
    const orderIds = orders.map((order) => order.orderId);
    if(!findOrder){
      return;
    }
    if(deleteGroup){
      this.orders = this.orders.filter((orderTableData) => orderTableData.symbol !== symbol);
      findOrder.stopListening();
    }
    else{
      findOrder.closeOrders(orderIds)
    }
    this._snackBar.open(`Zamknięto zlecenie nr ${orderIds.join(', ')}`, '', {
      duration: 2000,
    });
  }
}
