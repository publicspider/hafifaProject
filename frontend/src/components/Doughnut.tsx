import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { TankContext } from "../store/carsContext";
import axios from "axios";
import { Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Doughnut1() {
  const [responseData, setResponseData] = useState({
    kshirim: 0,
    notKshirim: 0,
  });
  function DataFunction() {
    axios
    
      .get("http://localhost:5000/api/cars/tanks")
      .then((response) => {
        const kshirotObjects = response.data.filter(
          (obj) => obj.kshirot === true
        );
        const totalObjects = response.data.length;
        const lengthOfKshirim = kshirotObjects.length;
        const lengthOfNotKshirim = response.data.length - lengthOfKshirim;
        const percentageOfKshirim = (lengthOfKshirim / totalObjects) * 100;
        const percentageOfNotKshirim =
          (lengthOfNotKshirim / totalObjects) * 100;

        setResponseData({
          kshirim: percentageOfKshirim,
          notKshirim: percentageOfNotKshirim,
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  useEffect(() => {
    DataFunction();
  }, []);
  const data = {
    labels: ["סך הכל כשירים"],
    datasets: [
      {
        label: "%",
        data: [responseData.kshirim, responseData.notKshirim],
        backgroundColor: ["#000", "#FFFF"],
        // borderColor: ["rgba(255, 99, 132, 1)"],
        // borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut
        style={{ margin: "0 auto", width: "200px", height: "auto" }}
        data={data}
      />
      {/* <Typography style={{ direction: "rtl" }} mb={2}>
        {responseData + "%" + "מהכלים הכשירים"}
      </Typography> */}
    </>
  );
}
