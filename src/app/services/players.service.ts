import { inject, Injectable, signal, Signal } from '@angular/core';
import { GetPlayersAPIResp, Player } from '../types/player';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private http = inject(HttpClient);

  private _payers = signal<Player[]>([]);
  readonly players = this._payers.asReadonly();
  constructor() {}

  getPlayers() {
    this.http.get<GetPlayersAPIResp>(environment.api.getPlayers).subscribe({
      next: (v) => {
        console.log(`getPlayers Response:`, v.players);
        this._payers.set(v.players);
      },
      error: (err) => {
        this._payers.set([]);
        console.error(err);
      },
    });
  }
}
