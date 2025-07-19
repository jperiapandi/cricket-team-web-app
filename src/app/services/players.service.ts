import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { GetPlayersAPIResp, Player } from '../types/player';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SelectedTeam, TeamRule } from '../types/teamRule';
import { GradesSortMap } from '../types/grade';
import { ALL_ROUNDER, BATTER, BOWLER, WICKET_KEEPER } from '../constants';
import {
  NoWicketKeeperError,
  TeamFullError,
  WicketKeeperExistsError,
} from '../types/appError';

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

  private _httpState = signal<string>('');
  readonly httpState = this._httpState.asReadonly();

  private _payers = signal<Player[]>([]);
  //
  readonly players = computed<Player[]>(() => {
    const srcPlayers = this._payers();
    const selPlayers = this._selectedPlayers();

    const updatedPlayers = srcPlayers.map((p1) => {
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

    //Sort players by Grade
    updatedPlayers.sort((p1, p2) => {
      return GradesSortMap[p1.grade] - GradesSortMap[p2.grade];
    });

    return updatedPlayers;
  });

  private _selectedPlayers = signal<Player[]>([]);
  readonly selectedPlayers = this._selectedPlayers.asReadonly();

  readonly selectedTeam = computed<SelectedTeam>(() => {
    //
    const selPlayers = this.selectedPlayers();
    let wicketKeeper = 0;
    let batters = 0;
    let bowlers = 0;
    let allRounders = 0;

    selPlayers.forEach((p) => {
      switch (p.role) {
        case WICKET_KEEPER:
          wicketKeeper++;
          break;
        case BATTER:
          batters++;
          break;
        case BOWLER:
          bowlers++;
          break;
        case ALL_ROUNDER:
          allRounders++;
          break;
      }
    });

    //Calculate error states
    const errorWicketKeepers = wicketKeeper != this.rule.wicketKeeper;
    const errorBatters = batters + allRounders < this.rule.batsmen.minimum;
    const errorBowlers = bowlers + allRounders < this.rule.bowlers.minimum;
    const errorLessPlayers = selPlayers.length < this.rule.total;

    let errorMsgLessPlayers = '';
    if (errorLessPlayers && this.rule.total - selPlayers.length > 1) {
      errorMsgLessPlayers = `Add ${
        this.rule.total - selPlayers.length
      } more players.`;
    }
    if (errorLessPlayers && selPlayers.length == 0) {
      errorMsgLessPlayers = `Start adding players to your Dream Team.`;
    }
    
    if (errorLessPlayers && this.rule.total - selPlayers.length == 1) {
      errorMsgLessPlayers = `Add ${
        this.rule.total - selPlayers.length
      } more player.`;
    }

    return {
      total: selPlayers.length,
      wicketKeeper,
      batters,
      bowlers,
      allRounders,

      errorWicketKeepers,
      errorBatters,
      errorBowlers,
      errorLessPlayers,
      errorMsgLessPlayers,
    };
  });

  constructor() {
    console.log(`PlayersService is created`);
  }

  getPlayers() {
    if (this._payers().length > 0) {
      //Players are already loaded.
      console.log(`Players are already loaded from API.`);
      return;
    }
    console.log(`Start loading players from API.`);
    this._httpState.set('loading');

    this.http.get<GetPlayersAPIResp>(environment.api.getPlayers).subscribe({
      next: (v) => {
        setInterval(() => {
          this._payers.set(v.players);
          this._httpState.set('success');
        }, 5000);
      },
      error: (err) => {
        this._payers.set([]);
        this._httpState.set('error');
        console.error(err);
      },
    });
  }

  /**
   * Add a player to the selected players list
   * @param id
   * @returns
   */
  selectPlayer(id: number) {
    const nextSelectedPlayers = [];
    const player = this.players().find((p) => {
      return p.id == id;
    });

    if (player) {
      //:: When already 11 players are in the team.
      if (this.selectedTeam().total == this.rule.total) {
        throw new TeamFullError();
      }

      const existingWicketKeeper = this._selectedPlayers().find((p) => {
        return p.role === WICKET_KEEPER;
      });

      //When trying to add a Wicket-Keeper
      if (player.role == WICKET_KEEPER && existingWicketKeeper) {
        throw new WicketKeeperExistsError();
      }

      //When trying to add a Player

      //:: Last one player needed AND no wicket-keeper in the team yet.
      if (
        !existingWicketKeeper &&
        this.selectedTeam().total == this.rule.total - 1 &&
        player.role !== WICKET_KEEPER
      ) {
        throw new NoWicketKeeperError();
      }

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
