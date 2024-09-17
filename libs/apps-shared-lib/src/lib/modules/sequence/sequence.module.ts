import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceComponent } from './sequence/sequence.component';
import { SharedLibModule } from 'shared-lib';



@NgModule({
  declarations: [SequenceComponent],
  imports: [
    CommonModule,
    SharedLibModule,
  ]
})
export class SequenceModule { }
