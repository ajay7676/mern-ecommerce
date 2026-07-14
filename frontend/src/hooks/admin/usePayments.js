import { useCallback, useMemo, useState } from "react";
import {
    upcomingPayments as upcomingPaymentsData,
  previousPayments as previousPaymentsData,
} from '../../components/admin/payments/payments'

const usePayments = () => {
  const [selectedPaymentId, setSelectedPaymentId] = useState(
    previousPaymentsData[0]?.id ?? null
  );

  const [loading] = useState(false);
  const [error] = useState(null);

  const selectedPayment = useMemo(() => {
    return (
      previousPaymentsData.find(
        (payment) => payment.id === selectedPaymentId
      ) ?? null
    );
  }, [selectedPaymentId]);

  const selectPayment = useCallback((paymentId) => {
    setSelectedPaymentId(paymentId);
  }, []);

  return {
    upcomingPayments: upcomingPaymentsData,

    previousPayments: previousPaymentsData,

    selectedPaymentId,

    setSelectedPaymentId: selectPayment,

    selectedPayment,

    loading,

    error,
  };
};

export default usePayments;