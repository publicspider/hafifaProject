import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import eitan from "../assets/eitan.jpg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginTry } from "../store/functions";
import { useForm, SubmitHandler } from "react-hook-form";
import { CarCtx } from "./context/carCtx.ts";
// import axios from "axios";

// import { handleLogin } from '../../../Backend/src/controllers/auth.js';

type Input = {
  pernr: number;
};

export default function Login() {
  const [open, setOpen] = React.useState(false);
  //  const [handleLogin,setHandleLogin]=React.useState();
  const { handleSubmit, register, formState } = useForm<Input>();
  const { errors } = formState;
  const navigate = useNavigate();
  // const handleLogin = (
  //   logged: boolean,
  //   gdud: string,
  //   manager: string,
  //   pernr: string
  // ) => {

  //   console.log('Login successful');
  // };

  const { handleLogin } = useContext(CarCtx);
  const onSubmit: SubmitHandler<Input> = (data) => {
    const data1 = { username: data.pernr, password: "111111" };
    
    
    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "success") {
          // Exist pernr, log in
          handleLogin(true, data.gdud, data.isManager, data.pernr);
          navigate("/dashboard");
          console.log(data.pernr);
        } else if (data.message === "fail") {
          // Not an existing pernr, throw error
          setOpen(true);
        } else {
          // Problem with the code
          console.log("problem");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item xs={3}>
        <Card sx={{ maxWidth: 500 }} style={{ alignContent: "center" }}>
          <CardActionArea>
            <CardMedia component="img" height="200" image={eitan} alt="login" />
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography gutterBottom variant="h5" component="div">
                  התחברות
                </Typography>
                <Typography gutterBottom variant="h3" component="div">
                  מספר אישי
                </Typography>

                <TextField
                  {...register("pernr", {
                    required: { value: true, message: "הכנס מספר אישי" },
                    minLength: {
                      value: 6,
                      message: "מספר אישי הוא לפחות 6 ספרות",
                    },
                    maxLength: {
                      value: 9,
                      message: "מספר אישי עד 9 ספרות",
                    },
                    pattern: /^[0-9]{6,9}$/,
                  })}
                  id="pernr"
                  name="pernr"
                  label="הכנס מספר אישי"
                  fullWidth
                  type="number"
                  color="secondary"
                  error={
                    errors.pernr?.message != null &&
                    errors.pernr?.message.length > 0
                  }
                  helperText={errors.pernr?.message}
                >
                  1
                </TextField>

                <Button
                  size="small"
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  התחבר
                </Button>
              </form>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
