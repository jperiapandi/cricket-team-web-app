import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { GetPlayersAPIResp, Player } from '../types/player';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private http = inject(HttpClient);

  private _payers = signal<Player[]>([]);
  readonly players = computed<Player[]>(() => {
    const oriPlayers = this._payers();
    const selPlayers = this._selectedPlayers();

    const updatedPlayers = oriPlayers.map((p1) => {
      const selected = selPlayers.find((p2) => p2.id == p1.id) != undefined;
      if (selected) {
        return {
          ...p1,
          selected,
        };
      } else {
        return p1;
      }
    });

    return updatedPlayers;
  });

  private _selectedPlayers = signal<Player[]>([]);
  readonly selectedPlayers = this._selectedPlayers.asReadonly();

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

  //
  selectPlayer(id: number) {
    console.log(`Select player ${id}`);
    const nextSelectedPlayers = [];
    const player = this.players().find((p) => {
      return p.id == id;
    });
    if (player) {
      this._selectedPlayers.update((prevList) => {
        return [...prevList, player];
      });
    }
  }

  removePlayer(id: number) {
    console.log(`Remove player ${id}`);

    this._selectedPlayers.update((prevList) => {
      return prevList.filter((p) => p.id != id);
    });
  }
}
