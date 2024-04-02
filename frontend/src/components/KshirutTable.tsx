import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";

interface CarData {
  _id: string;
  carNumber: string;
  makat: string;
  kshirot: boolean;
  gdud: string;
}

export default function KshirutTable() {
  const [responseData, setResponseData] = React.useState<CarData[]>([]);
  const [showMore, setShowMore] = React.useState<boolean>(false);

  React.useEffect(() => {
    axios
      .get<CarData[]>("http://localhost:5000/api/cars/tanks")
      .then((response) => {
        setResponseData(response.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const visibleData = showMore ? responseData : responseData.slice(0, 5);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>מספר רכב</TableCell>
              <TableCell>כשירות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleData.map((row) => (
              <TableRow
                key={row._id} // Assuming _id is unique
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.carNumber}
                </TableCell>
                <TableCell>{row.kshirot ? "כשיר" : "לא כשיר"}</TableCell>
              </TableRow>
            ))}
          </TableBody> 
        </Table>
      </TableContainer>
      {!showMore && responseData.length > 5 && (
        <Button variant="outlined" onClick={() => setShowMore(true)}>
          ראה עוד
        </Button>
      )}
      {showMore && (
        <Button variant="outlined" onClick={() => setShowMore(false)}>
          פחות
        </Button>
      )}
    </div>
  );
}
