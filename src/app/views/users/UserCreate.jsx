import React from "react";

import { Grid, TextField, MenuItem } from "@material-ui/core";
import { RoleEnum } from "Constants";
import ImageUpload from "app/components/Upload/ImageUpload";

export default function UserCreate(props) {
  const classes = props.classes;
  const { userCreateData } = props;
  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12}>
        <form className={classes.formroot} noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="Email"
            value={userCreateData.Email}
            name="Email"
            variant="outlined"
            fullWidth
            onChange={props.handleInputChange("Email")}
          />
        </form>
      </Grid>
      <Grid item xs={12}>
        
        <Grid item>
          <TextField
            id="outlined-select-sector"
            select
            margin="normal"
            required
            fullWidth
            value={userCreateData.Role}
            label="Role"
            variant="outlined"
            onChange={props.handleInputChange("Role")}
          >
            {RoleEnum.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        {/* <Grid>
        <form className={classes.formroot} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Description"
            value={userCreateData.Description}
            name="Description"
            variant="outlined"
            multiline
            rows={4}
            onChange={props.handleInputChange("Description")}
            fullWidth
          />
        </form>{" "}
        </Grid> */}
        
      </Grid>
    </Grid>
  );
}
