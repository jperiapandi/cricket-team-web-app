import { Component, computed, input, output } from '@angular/core';
import { IconButtonDirective } from '../../directives/icon.button';

@Component({
  selector: 'app-alert',
  imports: [IconButtonDirective],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
  host: {
    '[class]': 'classNames()',
  },
})
export class AlertComponent {
  type = input<'info' | 'warn' | 'error'>('info');
  dismissible = input(false);
  close = output();

  readonly classNames = computed(() => {
    return 'alert-cmp';
  });

  onCloseClick(evt: MouseEvent) {
    this.close.emit();
  }
}
