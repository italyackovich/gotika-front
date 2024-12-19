export interface Payment {
  id: number,
  orderId: number,
  paymentMethod: string,
  paymentStatus: string,
  paymentDate: string,
  yookassaPaymentId: string,
  confirmationUrl: string
}
