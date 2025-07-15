import { Grade } from './grade';
import { PlayerRole } from './role';

export type Player = {
  id: number;
  name: string;
  age: number;
  role: PlayerRole;
  image: string;
  desc: string;
  grade: Grade;

  selected?: boolean;
};

export type GetPlayersAPIResp = {
  players: Player[];
};
