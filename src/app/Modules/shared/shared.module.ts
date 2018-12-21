import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SliderComponent } from '../../Components/Shared/slider/slider.component';
import { HeaderComponent } from 'src/app/Components/Layout/header/header.component';
import { LoadingComponent } from '../../Components/loading/loading.component';

const COMPONENTS = [SliderComponent, HeaderComponent, LoadingComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports: COMPONENTS
})
export class SharedModule { }
