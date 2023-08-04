export interface CountryListReponse {
  id: number;
  name: string;
  formalName: string;
  subregion: string;
  region: string;
  continent: string;
  population?: number;
}

export interface CountryEditReponse {
  id: number;
  name: string;
  formalName: string;
  subregion: string;
  region: string;
  continent: string;
  population?: number;
  states: StateProvinces[];
}

export interface StateProvinces {
  id: number;
  name: string;
  code: string;
  salesTerritory: string;
  population?: number;
}
