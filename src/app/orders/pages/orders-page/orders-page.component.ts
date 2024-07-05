import { Component } from '@angular/core';
import { OrderService } from '../../../api/services/order.service';
import { CommonModule } from '@angular/common';
import { OrdersTableComponent } from '../../components/orders-table/orders-table.component';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, OrdersTableComponent],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent {
  public readonly orders$ = this._orderService.getOrders();

  public constructor(private readonly _orderService: OrderService) { }
}
