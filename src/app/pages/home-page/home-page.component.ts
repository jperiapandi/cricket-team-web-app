import { Component, inject, OnInit, signal } from '@angular/core';
import { PlayersService } from '../../services/players.service';
import { SHOW_INITIAL_ALERT } from '../../constants';
import { SelectedPlayerComponent } from '../../components/selected-player/selected-player.component';
import { AvailablePlayerComponent } from '../../components/available-player/available-player.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { NgClass, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconButtonDirective } from '../../directives/icon.button';
import { DialogService } from '../../services/dialogSvc';
import {
  NoWicketKeeperError,
  TeamFullError,
  WicketKeeperExistsError,
} from '../../types/appError';
import { WkExistsErrorComponent } from '../../components/wk-exists-error/wk-exists-error.component';
import { WkNeedErrorComponent } from '../../components/wk-need-error/wk-need-error.component';
import { TeamFullErrorComponent } from '../../components/team-full-error/team-full-error.component';
import { TeamStatusComponent } from "../../components/team-status/team-status.component";

@Component({
  selector: 'app-home-page',
  imports: [
    AvailablePlayerComponent,
    SelectedPlayerComponent,
    AlertComponent,
    NgForOf, NgClass,
    RouterLink,
    IconButtonDirective,
    TeamStatusComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  private dialog = inject(DialogService);

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

  onSelectClick(id: number) {
    try {
      this.playersSvc.selectPlayer(id);
    } catch (err) {
      if (err instanceof WicketKeeperExistsError) {
        this.dialog.openModal(WkExistsErrorComponent);
        return;
      }
      if (err instanceof NoWicketKeeperError) {
        this.dialog.openModal(WkNeedErrorComponent);
        return;
      }

      if (err instanceof TeamFullError) {
        this.dialog.openModal(TeamFullErrorComponent);
        return;
      }

      console.error(err);
    }
  }

  onAlertClose() {
    this.showInitialAlert.set(false);
    localStorage.setItem(SHOW_INITIAL_ALERT, 'false');
  }
}
