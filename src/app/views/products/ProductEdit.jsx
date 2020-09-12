import React from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

export default function ProductEdit(props) {
  const classes = props.classes;
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      
          <Grid item xs={12}>
            <form className={classes.formroot} noValidate autoComplete="off">
              <TextField
                id="filled-basic"
                label="Price"
                value={props.Price}
                name="Price"
                variant="outlined"
                onChange={props.handleEditChange("Price")}
                fullWidth
              />
            </form>{" "}
          
        </Grid>
        
        
        <Grid item xs={12}>
        <form className={classes.formroot} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Description"
            value={props.Description}
            name="Description"
            variant="outlined"
            multiline
            rows={4}
            onChange={props.handleEditChange("Description")}
            fullWidth
          />
        </form>{" "}
        </Grid>
        {/* file upload and description */}
        
    </Grid>
  );
}
