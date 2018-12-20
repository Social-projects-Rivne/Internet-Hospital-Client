import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../../Components/Shared/slider/slider.component';
import { MaterialModule } from '../material/material.module';

const COMPONENTS = [SliderComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: COMPONENTS
})
export class SharedModule { }
