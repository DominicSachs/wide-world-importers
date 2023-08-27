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

export interface CityListReponse {
  id: number;
  name: string;
  state: string;
  country: string;
  population?: number;
}

export interface CityEditResponse {
  id: number;
  name: string;
  population?: number | null;
  countryId: number;
  stateId: number;
}
