import { AddressResponse } from '@app/shared/models/address.model';

export interface CustomerListReponse {
  id: number;
  name: string;
  postalAddress: string;
  deliveryAddress: string;
}

export interface CustomerEditResponse {
  id: number;
  name: string;
  phone: string;
  fax: string;
  postalAddress: AddressResponse;
  deliveryAddress: AddressResponse;
}
