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

export interface AddressResponse {
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
}
