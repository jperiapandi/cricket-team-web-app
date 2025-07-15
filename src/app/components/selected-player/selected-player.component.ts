import { Component, input, output } from '@angular/core';
import { Player } from '../../types/player';

@Component({
  selector: 'app-selected-player',
  imports: [],
  templateUrl: './selected-player.component.html',
  host: {
    "class": 'selected-player-cmp',
  },
  styles: ``,
})
export class SelectedPlayerComponent {
  player = input.required<Player>();

  remove = output<number>();

  onRemoveClick(evt: MouseEvent, id: number) {
    this.remove.emit(id);
  }
}
