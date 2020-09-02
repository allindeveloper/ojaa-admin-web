import React from "react";

import { Grid, TextField, MenuItem } from "@material-ui/core";
import { CategoryEnum } from "Constants";

export default function ProductCreate(props) {
  const classes = props.classes;
  const { productCreateData } = props;
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12}>
        <form className={classes.formroot} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Title"
            value={productCreateData.Title}
            name="Title"
            variant="outlined"
            fullWidth
            onChange={props.handleInputChange("Title")}
          />
        </form>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} justify="center" alignItems="center">
          <Grid item xs={6}>
            <form className={classes.formroot} noValidate autoComplete="off">
              <TextField
                id="filled-basic"
                label="Price"
                value={productCreateData.Price}
                name="Price"
                variant="outlined"
                onChange={props.handleInputChange("Price")}
                fullWidth
              />
            </form>{" "}
          </Grid>
          <Grid item xs={6}>
            <form className={classes.formroot} noValidate autoComplete="off">
              <TextField
                id="filled-basic"
                label="Measurement"
                value={productCreateData.Measurement}
                name="Measurement"
                variant="outlined"
                onChange={props.handleInputChange("Measurement")}
                fullWidth
              />
            </form>{" "}
          </Grid>
        </Grid>

        <Grid>
        <TextField
                id="outlined-select-sector"
                select
                margin="normal"
                required
                fullWidth
                value={productCreateData.Category}
                label="Category"
                variant="outlined"
                onChange={props.handleInputChange("Category")}
                
              >
                {CategoryEnum.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}
