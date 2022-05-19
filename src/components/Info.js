import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

const Info = ({ items, handleDelete }) => {
  return (
    <Grid container spacing={2}>
      {[...items].reverse().map((item) => (
        <Grid key={item.id} item xs={6}>
          <Card variant="outlined" sx={{ minWidth: 250 }}>
            <Stack direction="row" justifyContent="space-between">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.date}
                </Typography>
                <Typography variant="h6" component="div" mb={2}>
                  BMI: {item.bmi}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2">
                    <strong>Weight: </strong>
                    <span>{item.weight}</span>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Height: </strong>
                    <span>{item.height}</span>
                  </Typography>
                </Stack>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="delete"
                  size="medium"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon
                    sx={{ "&:hover": { color: red[400] } }}
                    fontSize="inherit"
                  />
                </IconButton>
              </CardActions>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Info;
