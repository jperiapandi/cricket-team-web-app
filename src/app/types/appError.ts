export class NoWicketKeeperError extends Error {
  constructor() {
    super('No Wicket Keeper.', { cause: 'No-Wicket-Keeper' });
  }
}

export class WicketKeeperExistsError extends Error {
  constructor() {
    super('Already Wicket Keeper present. You can not add more than one.', {
      cause: 'Wicket-Keeper-Exists',
    });
  }
}

export class TeamFullError extends Error {
  constructor() {
    super('Team is full.', { cause: 'Team-Full' });
  }
}
