import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { purple } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import ShowLineChart from "./ShowLineChart";
import Form from "./Form";
import Info from "./Info";
import UndoBtn from "./UndoBtn";
import uuid from "react-uuid";

import { getData, storeData } from "./helpers/localStorage";

const CM_TO_M = 100;

const App = () => {
  const styles = {
    m: "50px 0",
  };

  const [state, setState] = useState({
    currentState: getData("data") || [],
    prevState: [],
  });

  const [graphData, setGraphData] = useState({
    dates: [],
    bmis: [],
  });

  const handleCalculate = (values) => {
    values.id = uuid();
    values.bmi = parseFloat(
      values.weight / Math.pow(values.height / CM_TO_M, 2)
    ).toFixed(2);
    values.date = new Date().toLocaleString().split(",")[0];
    setState({ ...state, currentState: [...state.currentState, values] });
  };

  const handleDelete = (id) => {
    setState({
      ...state,
      currentState: state.currentState.filter((i) => i.id !== id),
      prevState: state.currentState,
    });
  };

  const handleUndo = () => {
    setState({ ...state, currentState: state.prevState, prevState: [] });
  };

  useEffect(() => {
    storeData("data", state.currentState);
    const dates = state.currentState.map((i) => i.date.slice(0, 4));
    const bmis = state.currentState.map((i) => i.bmi);
    setGraphData({ dates, bmis });
  }, [state]);

  return (
    <Box sx={styles}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: purple[400] }}
      >
        BMI Tracker with Graph
      </Typography>
      <Grid
        container
        maxWidth="1100px"
        justifyContent="center"
        spacing={2}
        m="0 auto"
      >
        <Grid item xs={12}>
          <Form handleCalculate={handleCalculate} />
        </Grid>
        {graphData.dates.length !== 0 && graphData.bmis.length !== 0 && (
          <Grid item xs={8} alignItems="center">
            <ShowLineChart dates={graphData.dates} bmis={graphData.bmis} />
          </Grid>
        )}
        {state.currentState.length !== 0 && (
          <Grid item xs={12}>
            <Info items={state.currentState} handleDelete={handleDelete} />
          </Grid>
        )}
        {state.prevState.length !== 0 && (
          <Grid item xs={12} textAlign="center">
            <UndoBtn handleUndo={handleUndo} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default App;
