import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddtablePage } from './addtable';

@NgModule({
  declarations: [
    AddtablePage,
  ],
  imports: [
    IonicPageModule.forChild(AddtablePage),
  ],
})
export class AddtablePageModule {}
