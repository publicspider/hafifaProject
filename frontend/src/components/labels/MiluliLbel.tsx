import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

interface CarData {
  _id: string;
  carNumber: string;
  makat: string;
  kshirot: boolean;
  gdud: string;
}

export default function MiluliLbel() {
  const [responseData, setResponseData] = React.useState<CarData[]>([]);
  let counter = 0;

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

  // Count the number of cars with kshirot=true
  responseData.forEach((car) => {
    if (car.kshirot) {
      counter++;
    }
  });

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
       
        <Typography variant="body2" component="div">
          <div>
            <strong>כמות כלים כשירים:</strong> {counter}
          </div>
        </Typography>
        
      </CardContent>
    </Card>
  );
}
