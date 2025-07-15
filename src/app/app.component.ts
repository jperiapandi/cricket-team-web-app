import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayersService } from './services/players.service';
import { AlertComponent } from "./components/alert/alert.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  readonly playersSvc = inject(PlayersService);
  title = 'India Cricket Team';

  ngOnInit() {
    this.playersSvc.getPlayers()
  }
}
