import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"space-between",
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function FilterOrders() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
       <h4 className="m-0 pb-2 font-size-16 capitalize text-middle text-white">
            Dashboard
          </h4>
       <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Button style={{background:"#000000"}}>New Orders</Button>
        <Button>Active Orders</Button>
        <Button>Completed Orders</Button>
        
      </ButtonGroup>
    </div>
  );
}
