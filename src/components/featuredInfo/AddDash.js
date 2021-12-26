import React, { useState, useRef } from "react";
import "./AddDash.css";

import firebase from "../../Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firestore = firebase.firestore();
const auth = firebase.auth();

const isEmpty = (value) => value.trim().length === "";

function Form() {
  const [currentDate, setCurrentDate] = useState("");
  const [totalTime, setTotalTime] = useState("");
  const [totalOrders, setTotalOrders] = useState("");
  const [totalMiles, setTotalMiles] = useState("");
  const [totalMpg, setTotalMpg] = useState("");
  const [totalGasPrice, setTotalGasPrice] = useState("");
  const [totalPay, setTotalPay] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dateInputRef = useRef();
  const timeInputRef = useRef();
  const ordersInputRef = useRef();
  const milesInputRef = useRef();
  const mpgInputRef = useRef();
  const gasPriceInputRef = useRef();
  const payInputRef = useRef();

  // Firestore Collection
  const dashesRef = firestore.collection("dashes");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let gasCost = 0,
      milesPerOrder = 0,
      costToOperate = 0,
      costPerOrder = 0,
      netPay = 0,
      netPayPerHour = 0;

    gasCost = (totalMiles / totalMpg) * totalGasPrice;
    milesPerOrder = totalMiles / totalOrders;
    costToOperate = gasCost + totalMiles * 0.19;
    costPerOrder = costToOperate / totalOrders;
    netPay = totalPay - costToOperate;
    netPayPerHour = netPay / (totalTime / 60);

    gasCost = gasCost.toFixed(2);
    milesPerOrder = milesPerOrder.toFixed(2);
    costToOperate = costToOperate.toFixed(2);
    costPerOrder = costPerOrder.toFixed(2);
    netPay = netPay.toFixed(2);
    netPayPerHour = netPayPerHour.toFixed(2);

    const enteredDate = dateInputRef.current.value;
    const enteredTime = timeInputRef.current.value;
    const enteredOrders = ordersInputRef.current.value;
    const enteredMiles = milesInputRef.current.value;
    const enteredMpg = mpgInputRef.current.value;
    const enteredGasPrice = gasPriceInputRef.current.value;
    const enteredPay = payInputRef.current.value;

    const enteredDateIsValid = !isEmpty(enteredDate);
    const enteredTimeIsValid = !isEmpty(enteredTime);
    const enteredOrdersIsValid = !isEmpty(enteredOrders);
    const enteredMilesIsValid = !isEmpty(enteredMiles);
    const enteredMpgIsValid = !isEmpty(enteredMpg);
    const enteredGasPriceIsValid = !isEmpty(enteredGasPrice);
    const enteredPayIsValid = !isEmpty(enteredPay);

    const formIsValid =
      enteredDateIsValid &&
      enteredTimeIsValid &&
      enteredOrdersIsValid &&
      enteredMilesIsValid &&
      enteredMpgIsValid &&
      enteredGasPriceIsValid &&
      enteredPayIsValid;

    if (!formIsValid) {
      return;
    }

    // Send data to firestore
    const { uid, photoURL, email } = auth.currentUser;

    await dashesRef.add({
      totalTime: enteredTime,
      currentDate: enteredDate,
      totalOrders: enteredOrders,
      totalMiles: enteredMiles,
      totalMpg: enteredMpg,
      totalGasPrice: enteredGasPrice,
      totalPay: enteredPay,
      costPerOrder: costPerOrder,
      costToOperate: costToOperate,
      gasCost: gasCost,
      milesPerOrder: milesPerOrder,
      netPayPerHour: netPayPerHour,
      netPay: netPay,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      email,
    });

    setCurrentDate("");
    setTotalTime("");
    setTotalMiles("");
    setTotalOrders("");
    setTotalMpg("");
    setTotalGasPrice("");
    setTotalPay("");

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    // <div>
    <div className="form active">
      <div className="form-header">
        <h2>Add New Dash</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          ref={dateInputRef}
          id="date"
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          required
        />
        <label htmlFor="totalTime">Total Time (mins):</label>
        <input
          ref={timeInputRef}
          id="totalTime"
          type="number"
          step="0.01"
          required
          value={totalTime}
          onChange={(e) => setTotalTime(e.target.value)}
        />
        <label htmlFor="totalOrders">Number of Orders:</label>
        <input
          ref={ordersInputRef}
          id="totalOrders"
          type="number"
          step="0.01"
          required
          value={totalOrders}
          onChange={(e) => setTotalOrders(e.target.value)}
        />
        <label htmlFor="totalMiles">Total Miles:</label>
        <input
          ref={milesInputRef}
          id="totalMiles"
          type="number"
          step="0.01"
          required
          value={totalMiles}
          onChange={(e) => setTotalMiles(e.target.value)}
        />
        <label htmlFor="mpg">MPG:</label>
        <input
          ref={mpgInputRef}
          id="mpg"
          type="number"
          step="0.01"
          required
          value={totalMpg}
          onChange={(e) => setTotalMpg(e.target.value)}
        />
        <label htmlFor="gas">Gas Price per Gal (est):</label>
        <input
          ref={gasPriceInputRef}
          id="gas"
          type="number"
          step="0.01"
          required
          value={totalGasPrice}
          onChange={(e) => setTotalGasPrice(e.target.value)}
        />
        <label htmlFor="totalPay">Total Pay ($):</label>
        <input
          ref={payInputRef}
          id="totalPay"
          type="number"
          step="0.01"
          required
          value={totalPay}
          onChange={(e) => setTotalPay(e.target.value)}
        />
        {!isLoading && <button className="button-toggle">Add Dash</button>}
        {isLoading && (
          <div className="center">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
          </div>
        )}
      </form>
    </div>
    // </div>
  );
}

export default Form;
