import React, { useContext, useState } from "react";
import AuthContext from "../../auth-context";
import "./Chart.css";

import { Line } from "react-chartjs-2";
import { Dropdown } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import firebase from "../../Firebase";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const firestore = firebase.firestore();
const auth = firebase.auth();

const Chart = () => {
  const [category, setCategory] = useState({
    key: "totalPay",
    title: "Total Pay",
  });

  let chartDataset = {
    labels: [],
    datasets: [
      {
        label: category.title,
        data: [],
        backgroundColor: "#51cf66",
        borderColor: "#51cf66",
      },
    ],
  };

  let firebaseFiltered = [];
  const ctx = useContext(AuthContext);

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
      if (category.key === "totalPay") {
        for (let i = 0; i < firebaseFiltered.length; i++) {
          chartDataset.labels.push(firebaseFiltered[i].currentDate);
          chartDataset.datasets[0].data.push(firebaseFiltered[i].totalPay);
        }
      }
      if (category.key === "netPay") {
        for (let i = 0; i < firebaseFiltered.length; i++) {
          chartDataset.labels.push(firebaseFiltered[i].currentDate);
          chartDataset.datasets[0].data.push(firebaseFiltered[i].netPay);
        }
      }
      if (category.key === "netPayPerHour") {
        for (let i = 0; i < firebaseFiltered.length; i++) {
          chartDataset.labels.push(firebaseFiltered[i].currentDate);
          chartDataset.datasets[0].data.push(firebaseFiltered[i].netPayPerHour);
        }
      }
    }
  }

  const categoryOptions = [
    { key: "totalPay", value: "totalPay", text: "Total Pay" },
    { key: "netPay", value: "netPay", text: "Net Pay" },
    { key: "netPayPerHour", value: "netPayPerHour", text: "Net Pay per Hour" },
  ];

  const categorySelectionHandler = (event, data) => {
    let dataValue = data.value;
    let dataTitle = data.options
      .filter((option) => {
        if (option.key === dataValue) {
          return true;
        } else {
          return false;
        }
      })
      .map((option) => {
        return option.text;
      });
    console.log(dataValue);
    console.log(dataTitle);
    setCategory({ key: dataValue, title: dataTitle });
  };

  return (
    <div className="chart-container">
      <div className="dropdown-bar">
        <div className="dropdown-primary">
          <Dropdown
            className="test"
            placeholder="Select Category"
            defaultValue={category.key}
            fluid
            selection
            options={categoryOptions}
            onChange={categorySelectionHandler}
          />
        </div>
      </div>
      <div className="chart">
        <Line
          data={chartDataset}
          options={{
            plugins: {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: category.title,
                fontSize: 25,
                position: "top",
              },
              legend: {
                display: false,
                position: "right",
              },
            },
            scales: {
              y: {
                suggestedMin: 0,
                suggestedMax: 100,
                grid: {
                  display: false,
                },
              },
              x: {
                grid: {
                  display: false,
                },
              },
            },
          }}
        ></Line>
      </div>
    </div>
  );
};

export default Chart;
