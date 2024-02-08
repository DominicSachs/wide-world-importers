export interface OrderListReponse {
  id: number;
  customerPurchaseOrderNumber: string;
  orderedOn: Date;
  expectedDeliveryOn: Date;
  customerName: string;
  contactName: string;
  lastEditedByName: string;
  lastEditedAt: Date;
}
