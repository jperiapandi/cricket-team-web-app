export type TeamRule = {
  total: number;
  wicketKeeper: number;
  batsmen: {
    minimum: number;
    maximum: number;
  };
  bowlers: {
    minimum: number;
    maximum: number;
  };
};

export type SelectedTeam = {
  total: number;
  wicketKeeper: number;
  batters: number;
  bowlers: number;
  allRounders: number;

  errorWicketKeepers: boolean;
  errorBatters: boolean;
  errorBowlers: boolean;
};
