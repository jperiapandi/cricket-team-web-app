export type Player = {
  id: number;
  name: string;

  selected?: boolean;
};

export type GetPlayersAPIResp = {
  players: Player[];
};
