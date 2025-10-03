import { useLocation } from "react-router";
import useUserStore from "../../store/userStore";

function Invoice() {
  const location = useLocation();
  const { invoice, invoice2 } = location.state;
  const { user } = useUserStore();
  // console.log({ invoice, invoice2 });

  if (invoice) {
    return (
      <div className="bg-white w-full min-h-screen py-10">
        <div className="max-w-3xl mx-auto p-5 font-sans bg-white text-gray-800">
          <div className="flex justify-between items-center mb-8 pb-3 border-b border-gray-200">
            <div className="text-gray-600 font-semibold text-lg">
              Invoice {">> ID: #" + invoice.transaction_id}
            </div>
            <button
              onClick={() => {
                window.print();
              }}
              className="bg-transparent border-none text-blue-600 text-base cursor-pointer underline hover:text-blue-800"
            >
              Print
            </button>
          </div>

          <div className="text-center text-lg font-bold mb-10 text-gray-800">
            U2U DELEGATOR REWARD PROGRAM
          </div>

          <div className="flex justify-between mb-10">
            <div>
              <div className="text-gray-500 mb-1">
                To:
                <span className="text-blue-600 ml-1">{user.first_name}</span>
              </div>
              <div className="mb-1">{invoice.user_username}</div>
              <div>{user.phone_no}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold mb-3">Invoice</div>
              <div className="mb-1">
                <span className="font-bold">ID:</span>#{invoice.transaction_id}
              </div>
              <div>
                <span className="font-bold">Creation Date:</span> {invoice.date}
              </div>
            </div>
          </div>

          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  #
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Description
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Delegator amount
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Validator Platform Fee
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200">
                  {invoice.package_name}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {invoice.delegator_amount}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {invoice.validator_fee}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {invoice.total_amount}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mb-5 text-sm">
            Add additional notes and payment information
          </div>

          <div className="flex  mb-5">
            <div className="min-w-[200px]">
              <div className="flex justify-between mb-2">
                <span>SubTotal</span>
                <span>{invoice.delegator_amount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Fee</span>
                <span> {invoice.validator_fee}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                <span>Total Amount</span>
                <span>{invoice.total_amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-white w-full min-h-screen py-10">
        <div className="max-w-3xl mx-auto p-5 font-sans bg-white text-gray-800">
          <div className="flex justify-between items-center mb-8 pb-3 border-b border-gray-200">
            <div className="text-gray-600 font-semibold text-lg">
              Invoice {">> ID: #" + invoice2.trans_id}
            </div>
            <button
              onClick={() => {
                window.print();
              }}
              className="bg-transparent border-none text-blue-600 text-base cursor-pointer underline hover:text-blue-800"
            >
              Print
            </button>
          </div>

          <div className="text-center text-lg font-bold mb-10 text-gray-800">
            U2U DELEGATOR REWARD PROGRAM
          </div>

          <div className="flex justify-between mb-10">
            <div>
              <div className="text-gray-500 mb-1">
                To:
                <span className="text-blue-600 ml-1">{user.first_name}</span>
              </div>
              <div className="mb-1">{invoice2.activated_by}</div>
              <div>{user.phone_no}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold mb-3">Invoice</div>
              <div className="mb-1">
                <span className="font-bold">ID:</span>#{invoice2.trans_id}
              </div>
              <div>
                <span className="font-bold">Creation Date:</span>{" "}
                {invoice2.created_at != "-"
                  ? new Date(invoice2.created_at).toLocaleString("en-GB", {
                      hour12: false,
                    })
                  : "-"}
              </div>
            </div>
          </div>

          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  #
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Description
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Package Price
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  DePin Node Price
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Delegator amount
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Validator Platform Fee
                </th>
                <th className="p-3 text-left border-b-2 border-gray-200 font-bold">
                  Total Amountt
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border-b border-gray-200">1</td>
                <td className="p-3 border-b border-gray-200">
                  {invoice2.package_name}
                </td>
                <td className="p-3 border-b border-gray-200">
                  ${invoice2.pack_amount}
                </td>
                <td className="p-3 border-b border-gray-200">
                  ${invoice2.mobile}
                </td>
                <td className="p-3 border-b border-gray-200">
                  ${invoice2.lend_amount}
                </td>{" "}
                <td className="p-3 border-b border-gray-200">
                  ${invoice2.fee}
                </td>{" "}
                <td className="p-3 border-b border-gray-200">
                  ${invoice2.amount}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mb-5 text-sm">
            Add additional notes and payment information
          </div>

          <div className="flex  mb-5">
            <div className="min-w-[200px]">
              <div className="flex justify-between mb-2">
                <span>SubTotal</span>
                <span>${invoice2.pack_amount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Fee</span>
                <span> ${invoice2.fee}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                <span>Total Amount</span>
                <span>${invoice2.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Invoice;
