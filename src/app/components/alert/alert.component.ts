import { Component, computed, input } from '@angular/core';
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
  dismissible = input(false);
  readonly classNames = computed(() => {
    return 'alert-cmp';
  });
}
