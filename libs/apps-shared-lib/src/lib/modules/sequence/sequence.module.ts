import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceComponent } from './sequence/sequence.component';
import { SharedLibModule } from 'shared-lib';
import { ConfirmSequenceComponent } from './components/confirm-sequence/confirm-sequence.component';



@NgModule({
  declarations: [SequenceComponent,ConfirmSequenceComponent],
  imports: [
    CommonModule,
    SharedLibModule,
  ]
})
export class SequenceModule { }
