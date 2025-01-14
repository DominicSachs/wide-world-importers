import { AddressResponse } from '@app/shared/models/address.model';

export interface SupplierListReponse {
  id: number;
  name: string;
  category: string;
  phone: string;
  fax: string;
}

export interface SupplierEditReponse {
  id: number;
  name: string;
  categoryId: number;
  phone: string;
  fax: string;
  websiteUrl: string;
  deliveryMethodId: number;
  reference?: string;
  comments?: string;
  lastEditor: string;
  postalAddress: AddressResponse;
  deliveryAddress: AddressResponse;
}
