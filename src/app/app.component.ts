import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './api/services/order.service';
import { OrdersPageComponent } from './orders/pages/orders-page/orders-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, OrdersPageComponent],
  providers: [OrderService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(){
    document.body.classList.toggle('dark-theme', window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
}
