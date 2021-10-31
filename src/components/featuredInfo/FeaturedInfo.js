import React, { useContext } from "react";
import AuthContext from "../../auth-context";
import "./FeaturedInfo.css";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import firebase from "../../Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const auth = firebase.auth();

function Summary() {
  let firebaseFiltered = [];
  const ctx = useContext(AuthContext);
  const loadedDashes = [];

  let payTotal = 0;
  let netPayTotal = 0;
  let minsDrivenTotal = 0;
  let netPayPerHourTotal = 0;
  let ordersTotal = 0;
  let dashesTotal = 0;
  let mpgTotal = 0;
  let milesTotal = 0;
  let gasCostTotal = 0;
  let costPerOrderTotal = 0;
  let gasPriceTotal = 0;

  // Pull Dashes for Current User from Firebase
  const dashesRef = firestore.collection("dashes");
  const query = dashesRef.orderBy("currentDate");
  const [firebaseDashes] = useCollectionData(query, { idField: "id" });

  if (ctx.isLoggedIn) {
    const { uid } = auth.currentUser;

    if (firebaseDashes) {
      firebaseFiltered = firebaseDashes.flatMap((dash) =>
        uid === dash.uid ? dash : []
      );

      for (let i = 0; i < firebaseFiltered.length; i++) {
        loadedDashes.push({
          currentDate: firebaseFiltered[i].currentDate,
          totalTime: firebaseFiltered[i].totalTime,
          totalOrders: firebaseFiltered[i].totalOrders,
          totalMiles: firebaseFiltered[i].totalMiles,
          totalMpg: firebaseFiltered[i].totalMpg,
          totalGasPrice: firebaseFiltered[i].totalGasPrice,
          gasCost: firebaseFiltered[i].gasCost,
          milesPerOrder: firebaseFiltered[i].milesPerOrder,
          costPerOrder: firebaseFiltered[i].costPerOrder,
          totalPay: firebaseFiltered[i].totalPay,
          costToOperate: firebaseFiltered[i].costToOperate,
          netPay: firebaseFiltered[i].netPay,
          netPayPerHour: firebaseFiltered[i].netPayPerHour,
        });
      }
    }
  }

  // console.log("Dashes", loadedDashes);

  if (loadedDashes.length > 0) {
    payTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalPay);
    }, 0);

    netPayTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.netPay);
    }, 0);

    minsDrivenTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalTime);
    }, 0);

    netPayPerHourTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.netPayPerHour);
    }, 0);

    ordersTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalOrders);
    }, 0);

    dashesTotal = loadedDashes.reduce((acc, cur) => {
      return acc + 1;
    }, 0);

    mpgTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalMpg);
    }, 0);

    milesTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalMiles);
    }, 0);

    gasCostTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.gasCost);
    }, 0);

    costPerOrderTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.costPerOrder);
    }, 0);

    gasPriceTotal = loadedDashes.reduce((acc, cur) => {
      return acc + parseFloat(cur.totalGasPrice);
    }, 0);
  }

  const hoursDrivenTotal = minsDrivenTotal / 60;
  const netPayPerHourAverage = netPayPerHourTotal / dashesTotal;
  const mpgAverage = mpgTotal / dashesTotal;
  const costPerOrderAverage = costPerOrderTotal / ordersTotal;
  const gasPriceAverage = gasPriceTotal / dashesTotal;

  return (
    <div className="summary-container">
      <div className="summary-box">
        <AccountBalanceIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Total Pay</h2>
        <h3 className="summary-green summary-amount">${payTotal.toFixed(2)}</h3>
      </div>
      <div className="summary-box">
        <AttachMoneyIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Total Net Pay</h2>
        <h3 className="summary-green summary-amount">
          ${netPayTotal.toFixed(2)}
        </h3>
      </div>
      <div className="summary-box">
        <AttachMoneyIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Average Net $ / Hr</h2>
        <h3 className="summary-green summary-amount">
          ${netPayPerHourAverage.toFixed(2)}
        </h3>
      </div>
      <div className="summary-box">
        <TrendingUpIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Total Orders</h2>
        <h3 className="summary-amount">{ordersTotal.toFixed(0)}</h3>
      </div>
      <div className="summary-box">
        <AccessTimeIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Total Hours Driven</h2>
        <h3 className="summary-amount">{hoursDrivenTotal.toFixed(2)} hrs</h3>
      </div>
      <div className="summary-box">
        <RotateLeftIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Average MPG</h2>
        <h3 className="summary-amount">{mpgAverage.toFixed(1)} mpg</h3>
      </div>
      <div className="summary-box">
        <DirectionsCarFilledIcon
          className="summary-block-icon"
          fontSize="large"
        />
        <h2 className="summary-title">Total Miles Driven</h2>
        <h3 className="summary-amount">{milesTotal.toFixed(1)} mi</h3>
      </div>
      <div className="summary-box">
        <LocalGasStationIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Total Gas Cost</h2>
        <h3 className="summary-red summary-amount">
          ${gasCostTotal.toFixed(2)}
        </h3>
      </div>
      <div className="summary-box">
        <AttachMoneyIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Avg Gas Price</h2>
        <h3 className="summary-red summary-amount">
          ${gasPriceAverage.toFixed(2)}
        </h3>
      </div>
      <div className="summary-box">
        <AttachMoneyIcon className="summary-block-icon" fontSize="large" />
        <h2 className="summary-title">Avg Cost per Order</h2>
        <h3 className="summary-red summary-amount">
          ${costPerOrderAverage.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

export default Summary;

/*****  -- Object from API -- *****/

// costPerOrder: "2.61"
// costToOperate: "5.22"
// currentDate: "2021-08-14"
// gasCost: "2.37"
// id: "-MhuqbeOybVk3qAz6dxt"
// milesPerOrder: "7.50"
// netPay: "24.21"
// netPayPerHour: "24.21"
// totalGasPrice: "4.10"
// totalMiles: "15"
// totalMpg: "26"
// totalOrders: "2"
// totalPay: "29.43"
// totalTime: "60"

// import "./FeaturedInfo.css";
// import React from "react";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// function FeaturedInfo() {
//   return (
//     <div className="featured">
//       <div className="featuredItem">
//         <span className="featuredTitle">Revenue</span>
//         <div className="featuredMoneyContainer">
//           <span className="featuredMoney">$2,415</span>
//           <span className="featuredMoneyRate">
//             -11.4 <ArrowDownwardIcon />
//           </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//       </div>
//     </div>
//   );
// }

// export default FeaturedInfo;
