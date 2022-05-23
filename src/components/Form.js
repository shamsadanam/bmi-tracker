import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const Form = ({ handleCalculate, handleUndo }) => {
  const CalculateBtn = styled(Button)(({ theme }) => ({
    borderRadius: "10px",
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));

  const [state, setState] = useState({
    weight: "",
    height: "",
  });

  const onClickHandler = () => {
    handleCalculate(state);
    setState({ weight: "", height: "" });
  };

  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={5}>
        <TextField
          type="number"
          fullWidth
          label="Weight"
          value={state.weight}
          InputProps={{
            endAdornment: <InputAdornment position="start">kg</InputAdornment>,
          }}
          onChange={(e) => setState({ ...state, weight: e.target.value })}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          label="Height"
          value={state.height}
          type="number"
          min="10"
          InputProps={{
            endAdornment: <InputAdornment position="start">cm</InputAdornment>,
          }}
          onChange={(e) =>
            setState({
              ...state,
              height:
                e.target.value < 0 ? Math.abs(e.target.value) : e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={2} display="flex" justifyContent="center">
        <CalculateBtn
          disabled={state.weight && state.height ? false : true}
          variant="contained"
          onClick={onClickHandler}
        >
          Calculate
        </CalculateBtn>
      </Grid>
    </Grid>
  );
};

export default Form;
