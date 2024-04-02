import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface CarData {
  carNumber: string;
  makat: string;
  kshirot: string;
  gdud: string;
}

export default function KshirutTable() {
  const [responseData, setResponseData] = React.useState<CarData[]>([]);
  const [displayedRows, setDisplayedRows] = React.useState<number>(5);
  const navigate = useNavigate();
  const [newData, setNewData] = React.useState<CarData>({
    carNumber: "",
    makat: "",
    kshirot: "1",
    gdud: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/isLoggedIn", {
        withCredentials: true,
      })
      .then((response) => {
        if (!response.data.isManager) {
          return navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<CarData[]>("http://localhost:5000/api/cars/tanks")
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/cars/addTank", newData)
      .then((res) => {
        console.log(res.data);
        setNewData({
          carNumber: "",
          makat: "",
          kshirot: "",
          gdud: "",
        });
        fetchData();
      })
      .catch((err) => {
        console.log("Error adding new object:", err);
      });
  };

  const handleShowMoreRows = () => {
    setDisplayedRows((prevCount) => prevCount + 5);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>מספר רכב</TableCell>
              <TableCell>מק"ט</TableCell>
              <TableCell>כשירות</TableCell>
              <TableCell>גדוד</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseData.slice(0, displayedRows).map((row) => (
              <TableRow key={row.carNumber}>
                <TableCell>{row.carNumber}</TableCell>
                <TableCell>{row.makat}</TableCell>
                <TableCell>{row.kshirot ? "כשיר" : "לא כשיר"}</TableCell>
                <TableCell>{row.gdud}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button onClick={handleShowMoreRows}>הצג עוד</button>
      <form onSubmit={handleSubmit}>
        <label>
          מספר רכב:
          <input
            type="text"
            name="carNumber"
            value={newData.carNumber}
            onChange={handleInputChange}
          />
        </label>
        <label>
          מק"ט:
          <input
            type="text"
            name="makat"
            value={newData.makat}
            onChange={handleInputChange}
          />
        </label>
        <label>
          כשירות:
          <select
            name="kshirot"
            value={newData.kshirot}
            onChange={handleInputChange}
          >
            <option value="1">כשיר</option>
            <option value="0">לא כשיר</option>
          </select>
        </label>
        <label>
          גדוד:
          <input
            type="text"
            name="gdud"
            value={newData.gdud}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">הוסף</button>
      </form>
    </div>
  );
}
