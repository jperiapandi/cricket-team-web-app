import { Component, input, output } from '@angular/core';
import { Player } from '../../types/player';

@Component({
  selector: 'app-available-player',
  imports: [],
  templateUrl: './available-player.component.html',
  styles: ``,
})
export class AvailablePlayerComponent {
  player = input.required<Player>();

  select = output<number>();

  onSelectClick(evt: MouseEvent, id: number) {
    this.select.emit(id);
  }
}
