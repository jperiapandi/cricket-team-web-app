import {
  Directive,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[icon-button]',
})
export class IconButtonDirective implements OnInit {
  el = inject(ElementRef);
  iconName = input('computer', { alias: 'icon-button' });

  @HostBinding('class') className = 'material-icons icon-button';

  ngOnInit(): void {
    this.el.nativeElement.innerText = this.iconName();
  }
}
