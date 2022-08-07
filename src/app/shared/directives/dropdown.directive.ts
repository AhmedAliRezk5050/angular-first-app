import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  isVisible = false;
  dropdownClassName = '.dropdown-menu';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  onClick() {
    console.log('onClick');

    this.isVisible = !this.isVisible;

    if (this.isVisible) {
      this.renderer.addClass(this.hostElement, 'show');
    } else {
      this.renderer.removeClass(this.hostElement, 'show');
    }
  }

  @HostListener('focusout')
  onBlur() {
    this.isVisible = !this.isVisible;
    this.renderer.removeClass(this.hostElement, 'show');
  }

  get hostElement() {
    const x = this.el.nativeElement;

    return (
      x.querySelector(this.dropdownClassName) ??
      x.parentNode.querySelector(this.dropdownClassName)
    );
  }
}
