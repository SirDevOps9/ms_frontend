import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Directive({
  selector: '[appLoader]',
})
export class LoaderDirective implements OnChanges {
  @Input() appLoader = false;

  private spinnerElement?: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appLoader']) {
      this.updateLoader(changes['appLoader'].currentValue as boolean);
    }
  }

  private updateLoader(isLoading: boolean): void {
    const element = this.el.nativeElement;

    if (isLoading) {
      if (!this.spinnerElement) {
        const componentRef = this.viewContainerRef.createComponent(SpinnerComponent);

        this.spinnerElement = componentRef.location.nativeElement;

        this.renderer.setStyle(element, 'position', 'relative');
        this.renderer.appendChild(element, this.spinnerElement);
      }
    } else {
      if (this.spinnerElement) {
        this.renderer.removeChild(this.el.nativeElement, this.spinnerElement);
        this.spinnerElement = undefined;
      }
    }
  }
}

/*
  Usage:

  Simply add the directive to any HTML element and bind it to a boolean value, as shown below:

  <div [appLoader]="true"></div>

  Future Enhancements:
  This directive can be further enhanced to accept a custom spinner component as an input,
  allowing greater flexibility and dynamic customization.
*/
