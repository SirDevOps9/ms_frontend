import { Component, EventEmitter, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-wraper',
  standalone: true,
  imports: [SharedModule , CommonModule],
  templateUrl: './button-wraper.component.html',
  styleUrl: './button-wraper.component.scss'
})
export class ButtonWraperComponent {
@Input()label : string

sendAction = new EventEmitter<any>();

  btnAction(label : string) {
   this.sendAction.emit(label)
  }
}
