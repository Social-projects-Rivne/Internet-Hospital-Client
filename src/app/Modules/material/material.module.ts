import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
          MatTooltipModule,
          MatSidenavModule,
          MatToolbarModule,
          MatIconModule,
          MatDialogModule,
          MatNativeDateModule,
          MatListModule,
          MatGridListModule,
          MatInputModule,
          MatFormFieldModule,
          MatRadioModule,
          MatSelectModule,
          MatDatepickerModule,
          MatCheckboxModule,
          MatButtonModule,
          MatSnackBarModule,
          MatCardModule,
          MatPaginatorModule,
          MatDividerModule,
          MatTableModule,
          MatSortModule,
          MatMenuModule,
          MatButtonToggleModule,
          MatExpansionModule,
          MatProgressSpinnerModule,
          MatBadgeModule,
          MatTabsModule } from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

const MAT_MODULS = [
    MatTooltipModule,
    MatSidenavModule,
    CommonModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    FlexLayoutModule,
    MatDividerModule,
    MatPaginatorModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatTabsModule
  ];

@NgModule({
  imports: [MAT_MODULS],
  declarations: [],
  exports: [MAT_MODULS]
})
export class MaterialModule { }
