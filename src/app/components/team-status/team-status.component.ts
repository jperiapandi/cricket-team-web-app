import { Component, input } from '@angular/core';
import { SelectedTeam } from '../../types/teamRule';

@Component({
  selector: 'app-team-status',
  imports: [],
  templateUrl: './team-status.component.html',
  styleUrl: './team-status.component.css',
  host: {
    class: 'team-status-cmp',
  },
})
export class TeamStatusComponent {
  title = input('');
  team = input.required<SelectedTeam>();
}
