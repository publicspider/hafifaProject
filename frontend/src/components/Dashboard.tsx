import { Doughnut1 } from "./Doughnut.tsx";
import VerticalBar from "./VerticalBar.tsx";
import { Grid } from "@mui/material";
import KshirutTable from "./KshirutTable.tsx";
import React from "react";
import MiluliLbel from "./labels/MiluliLbel.tsx";
import numlabel from "./labels/NumLabel.tsx";
import Numlabel from "./labels/NumLabel.tsx";
import PrecentageLabel from "./labels/precentageLabel.tsx";


export default function Dashboard() {
  return (
    
    <Grid 
    container
    justifyContent="center"
    alignItems="stretch"
    spacing={3}
    style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} md={6} >
        <VerticalBar/>
        
      </Grid>
      <Grid item xs={12} md={6}>
      <Doughnut1/> 
        </Grid>
      <Grid item xs={12} md={4}>
        <MiluliLbel/>
        
       
      </Grid>
      <Grid item xs={12} md={4}>
      <Numlabel/>
      </Grid>
      <Grid item xs={12} md={4}>
      <PrecentageLabel/>
      </Grid>
      <Grid item xs={12}>
        <KshirutTable/>
      </Grid>
      
    </Grid>
    
  );
}
