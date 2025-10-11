//normal imports
import { Route, Routes } from "react-router";
import useConstStore from "./store/constStore";
//----------------------------------------------------------------------

//screens imports
//main screens
// import Landing from "./screens/Landing";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";
import PNF from "./screens/PNF";
// import Support from "./screens/Support";
import ForgetPassword from "./screens/ForgetPassword";
import ResetPassword from "./screens/ResetPassword";
import Chat from "./components/Support/Chat";
import Invoice from "./components/common/Invoice";
import BuyPackage from "./screens/Delegator/BuyPackage";

//authentication screens
import Profile from "./screens/Authentication/Profile";
import LoginPassword from "./screens/Authentication/LoginPassword";
import TwoFA from "./screens/TwoFA";

//network screens
import MyDirect from "./screens/Network/MyDirect";
import TeamNetwork from "./screens/Network/TeamNetwork";
import LevelVolume from "./screens/Network/LevelVolume";
import RankVolume from "./screens/Network/RankVolume";
import DirectTeamDetails from "./screens/Network/DirectTeamDetails";
import MyDirectTeam from "./screens/Network/MyDirectTeam";
import ActiveUserDetails from "./screens/Network/ActiveUserDetails";
import AmountDetail from "./screens/Network/AmountDetail";

//income screens
import DailyDelegatorReward from "./screens/Income/DailyDelegatorReward";
import DirectBonus from "./screens/Income/DirectBonus";
import DelegatorLevelBonus from "./screens/Income/DelegatorLevelBonus";
import RankAndRewards from "./screens/Income/RankAndRewards";

//delegator screens
import DelegatorPPActivation from "./screens/Delegator/DelegatorPPActivation";
import PromoPackHistory from "./screens/Delegator/PromoPackHistory";
import VerificationofNode from "./screens/Delegator/VerificationofNode";

// deposit & withdraw screens
import Delegate from "./screens/WalletAndDelegator/Delegate";
import DelegatorReport from "./screens/WalletAndDelegator/DelegatorReport";
import DepositeFund from "./screens/WalletAndDelegator/DepositeFund";
import DepositeReport from "./screens/WalletAndDelegator/DepositeReport";
import Withdraw from "./screens/WalletAndDelegator/Withdraw";
import WithdrawReport from "./screens/WalletAndDelegator/WithdrawReport";
import DepositeBackup from "./screens/WalletAndDelegator/DepositeBackup";

//----------------------------------------------------------------------
//Component imports
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import Loader from "./components/common/Loader";

//----------------------------------------------------------------------

function App() {
  const {
    screenLoading,
    msg,
    showSuccess,
    showError,
    // showNotification,
    // setShowNotification,
  } = useConstStore();

  return (
    <>
      {/* {showNotification && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-10">
          <div className="max-w-md mx-auto bg-[#09182C] text-gray-200 shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-3">Notice</h2>

            <p className="text-gray-300 mb-6">
              Dear Delegator, We are currently upgrading our complete user
              dashboard in Node & React. The system will be fully live again
              within the next 3–4 hours. Rest assured, all your funds and data
              remain completely safe and secure. Your trust is our top priority,
              and we are committed to delivering the best possible experience.
              Thank you for your patience and continued support. – Team Asia
              Validator{" "}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowNotification(false);
                }}
                className="px-4 cursor-pointer py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )} */}
      {screenLoading && <Loader />}
      {showError && (
        <div
          role="alert"
          className="alert alert-error absolute z-50 right-2 top-2 font-bold text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{msg}</span>
        </div>
      )}
      {showSuccess && (
        <div
          role="alert"
          className="alert alert-success absolute z-50 right-2 top-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{msg}</span>
        </div>
      )}
      <Routes>
        {/*public route*/}
        <Route element={<PublicRoute />}>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/register/:referralId?" element={<Signup />} />
        </Route>

        {/*private route*/}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/support" element={<Support />} /> */}
          <Route path="/chat" element={<Chat />} />
          <Route path="/invoice" element={<Invoice />} />

          {/*authentication route*/}
          <Route path="/profile" element={<Profile />} />
          <Route path="/loginpassword" element={<LoginPassword />} />
          <Route path="/twofa" element={<TwoFA />} />

          {/*network route*/}
          <Route path="/mydirect" element={<MyDirect />} />
          <Route path="/teamnetwork" element={<TeamNetwork />} />
          <Route path="/levelvolume" element={<LevelVolume />} />
          <Route path="/rankvolume" element={<RankVolume />} />
          <Route path="/directteamdetails" element={<DirectTeamDetails />} />
          <Route path="/mydirectteam" element={<MyDirectTeam />} />
          <Route path="/activeuserdetails" element={<ActiveUserDetails />} />
          <Route path="/amountdetail" element={<AmountDetail />} />

          {/*income route*/}
          <Route
            path="/dailydelegatorreward"
            element={<DailyDelegatorReward />}
          />
          <Route path="/directbonus" element={<DirectBonus />} />
          <Route
            path="/delegatorlevelbonus"
            element={<DelegatorLevelBonus />}
          />
          <Route path="/rank&reward" element={<RankAndRewards />} />

          {/*delegator route*/}
          <Route
            path="/delegatorppactivation"
            element={<DelegatorPPActivation />}
          />
          <Route path="/promopackhistory" element={<PromoPackHistory />} />
          <Route path="/verificationofnode" element={<VerificationofNode />} />
          <Route path="/buypackage" element={<BuyPackage />} />

          {/*wallet & delegator route*/}
          <Route path="/delegateusdtbep20" element={<Delegate />} />
          <Route path="/delegatorreport" element={<DelegatorReport />} />
          <Route path="/depositebackupone" element={<DepositeFund />} />
          <Route path="/depositefund" element={<DepositeBackup />} />
          <Route path="/depositerport" element={<DepositeReport />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/withdrawreport" element={<WithdrawReport />} />
        </Route>
        <Route path="*" element={<PNF />} />
      </Routes>
    </>
  );
}

export default App;
