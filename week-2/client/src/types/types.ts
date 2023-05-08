export type Team = {
  id: number;
  name: string;
  stadium: string;
  country: string;
  city: string;
  players?: Player[];
};

export type Player = {
  id: number;
  name: string;
  number: number;
  age: number;
  teamId: number;
};

export type FetchTeams = {
  teams: Team[];
};

export type FetchTeam = {
  team: Team;
};

export type FetchPlayer = {
  player: Player;
};
