import { Component, inject, OnInit, signal } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { SHOW_INITIAL_ALERT } from '../../constants';
import { SelectedPlayerComponent } from '../../components/selected-player/selected-player.component';
import { AvailablePlayerComponent } from '../../components/available-player/available-player.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconButtonDirective } from '../../directives/icon.button';

@Component({
  selector: 'app-home-page',
  imports: [
    AvailablePlayerComponent,
    SelectedPlayerComponent,
    AlertComponent,
    NgForOf,
    RouterLink,
    IconButtonDirective
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  readonly playersSvc = inject(PlayersService);
  title = 'India Cricket Team';

  showInitialAlert = signal(
    localStorage.getItem(SHOW_INITIAL_ALERT)?.trim() === 'true' ||
      localStorage.getItem(SHOW_INITIAL_ALERT)?.trim() == '' ||
      localStorage.getItem(SHOW_INITIAL_ALERT) == null
  );

  ngOnInit() {
    this.playersSvc.getPlayers();
  }

  onAlertClose() {
    this.showInitialAlert.set(false);
    localStorage.setItem(SHOW_INITIAL_ALERT, 'false');
  }
}
