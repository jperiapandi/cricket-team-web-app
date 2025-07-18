import { Component, computed, input, output } from '@angular/core';
import { Player } from '../../types/player';

@Component({
  selector: 'app-available-player',
  imports: [],
  templateUrl: './available-player.component.html',
  styles: ``,
  host: {
    class: 'available-player-cmp',
  },
})
export class AvailablePlayerComponent {
  player = input.required<Player>();
  readonly roleIcon = computed(() => {
    switch (this.player().role) {
      case 'Batter':
        return 'bat.svg';

      case 'Bowler':
        return 'ball.svg';

      case 'Wicket-Keeper':
        return 'plyr-keeper.svg';

      default:
        return 'all-rounder.svg';
    }
  });
  select = output<number>();

  onSelectClick(evt: MouseEvent, id: number) {
    this.select.emit(id);
  }
}
