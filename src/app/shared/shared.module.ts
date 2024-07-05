import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastToOrderRowPipe } from './pipes/cast-to-order-row.pipe';
import { CastToOrderGroupPipe } from './pipes/cast-to-order-group.pipe';

const pipes = [CastToOrderRowPipe, CastToOrderGroupPipe];

@NgModule({
  exports: [...pipes],
  declarations: [...pipes],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
