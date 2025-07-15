import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { GetPlayersAPIResp, Player } from '../types/player';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SelectedTeam, TeamRule } from '../types/teamRule';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  private http = inject(HttpClient);

  readonly rule: TeamRule = {
    wicketKeeper: 1,
    total: 11,
    batsmen: {
      minimum: 4,
      maximum: 7,
    },
    bowlers: {
      minimum: 3,
      maximum: 6,
    },
  };

  private _payers = signal<Player[]>([]);
  //
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

  // private _selectedTeam = signal<SelectedTeam>({
  //   total: 0,
  //   wicketKeeper: 0,
  //   batsmen: 0,
  //   bowlers: 0,
  //   allRounders: 0,
  // });

  readonly selectedTeam = computed<SelectedTeam>(() => {
    //
    const selPlayers = this.selectedPlayers();
    let wicketKeeper = 0;
    let batsmen = 0;
    let bowlers = 0;
    let allRounders = 0;

    selPlayers.forEach((p) => {
      switch (p.role) {
        case 'Wicket-Keeper':
          wicketKeeper++;
          break;
        case 'Batter':
          batsmen++;
          break;
        case 'Bowler':
          bowlers++;
          break;
        case 'All-Rounder':
          allRounders++;
          break;
      }
    });

    return {
      total: selPlayers.length,
      wicketKeeper,
      batters: batsmen,
      bowlers,
      allRounders,
    };
  });

  constructor() {}

  getPlayers() {
    this.http.get<GetPlayersAPIResp>(environment.api.getPlayers).subscribe({
      next: (v) => {
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
    this._selectedPlayers.update((prevList) => {
      return prevList.filter((p) => p.id != id);
    });
  }
}
