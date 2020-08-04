import { NgModule } from '@angular/core';
import { ViewImageComponent } from './view-image.component';
import { HammerModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import 'hammerjs';

@NgModule({
  declarations: [ViewImageComponent],
  imports: [HammerModule, CommonModule],
  exports: [ViewImageComponent],
})
export class ViewImageModule {}
