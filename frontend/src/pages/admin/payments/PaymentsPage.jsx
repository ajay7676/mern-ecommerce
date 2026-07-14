import PaymentsHeader from '../../../components/admin/payments/PaymentsHeader'
import UpcomingPayments from "../../../components/admin/payments/UpcomingPayments";
import PreviousPayments from "../../../components/admin/payments/PreviousPayments";

import usePayments  from '../../../hooks/admin/usePayments'
import PaymentsTable from '../../../components/admin/payments/table/PaymentsTable';

const PaymentsPage = () => {
    const {
    upcomingPayments,
    previousPayments,
    selectedPaymentId,
    setSelectedPaymentId,
  } = usePayments();
  return (
    <section className="min-h-screen bg-base-200">
      <div className="mx-auto max-w-8xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <PaymentsHeader
            onDownload={() => console.log("Download")}
            onViewStatements={() => console.log("Statements")}
            onViewSettlements={() => console.log("Settlements")}
            />

        {/* Upcoming Payments */}
        <UpcomingPayments
           payments={upcomingPayments}
        />

        {/* Previous Payments */}
        
        <PreviousPayments
          payments={previousPayments}
          selectedPaymentId={selectedPaymentId}
          onSelectPayment={setSelectedPaymentId}
        />
        {/*  Payments Table  */}
         <PaymentsTable />

        {/* Survey */}
        {/* <PaymentSurvey /> */}
      </div>
    </section>
  )
}

export default PaymentsPage