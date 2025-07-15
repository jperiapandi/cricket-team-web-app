import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayersService } from './services/players.service';
import { AlertComponent } from './components/alert/alert.component';
import { SHOW_INITIAL_ALERT } from './constants';
import { NgFor } from '@angular/common';
import { AvailablePlayerComponent } from "./components/available-player/available-player.component";
import { SelectedPlayerComponent } from "./components/selected-player/selected-player.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent, NgFor, AvailablePlayerComponent, SelectedPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
