import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() icon: string;
  @Input() enableText: boolean = false;
  @Input() severity: string;
  @Input() disabled: boolean = false;
  @Input() outlined: boolean = false;
  @Input() rounded: boolean = false;
  @Input() label: string;
  @Input() className: string;
  @Input() labelTest: string = 'button';
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  constructor() {}
  
  ngAfterViewInit() {
    if (this.label) {
      setTimeout(() => {
        this.labelTest = this.label;
      }, 500);
    }
  }

}
