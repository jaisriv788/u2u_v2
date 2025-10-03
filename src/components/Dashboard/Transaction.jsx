import { TfiReload } from "react-icons/tfi";
import useDashboardStore from "../../store/dashboardStore";

function Transaction() {
  const { dashboardData } = useDashboardStore();

  // console.log("transation")

  return (
    <div className="rounded-lg">
      <div className="flex gap-3 items-center bg-gradient-to-br from-[#0F0F1D] via-[#102031] to-[#24BB79] p-3 text-lg font-semibold">
        <TfiReload /> Transaction History
      </div>
      <div className="flex gap-3 pb-50 items-center bg-gradient-to-br from-[#0F0F1D] via-[#102031] to-[#24BB79] p-3 text-lg font-semibold">
        <div className="overflow-x-auto w-full rounded-box border border-base-content/5 bg-[#1F2C24]">
          <table className="table w-full">
            <thead className="text-white">
              <tr>
                <th>Transaction Id</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData?.transaction?.length == 0 ? (
                <tr>
                  <td className="text-center" colSpan={4}>
                    Data Not Found
                  </td>
                </tr>
              ) : (
                dashboardData?.transaction?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.trans_id}</td>
                    <td>$ {item.amount}</td>
                    <td>
                      {item.transaction_type
                        ? item.transaction_type[0].toUpperCase() +
                          item.transaction_type.slice(1)
                        : "Credit"}
                    </td>
                    <td>{item.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Transaction;


