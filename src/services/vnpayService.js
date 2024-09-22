import { Axios } from './Axios';

export const vnpayService = {
  createPaymentUrl: (payload) => {
    return Axios.post('/api/Vnpay/create-payment-url', payload);
  },
};
