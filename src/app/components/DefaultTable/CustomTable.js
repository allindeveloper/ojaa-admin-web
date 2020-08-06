import React, { Component } from 'react';

import { Grid, Button,Paper } from '@material-ui/core';
import clsx from 'clsx';

if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}


export const CustomTable = (props)=>{
  const classes = props.classes
	return (
		<>
        {
          props.rows.length > 0 && 
         <>
          {
            props.rows.map((item,index)=>{
             return (
              <div key={index}>
              <Paper component="div" className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Order Number
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {item.OrderNumber}
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Order Time
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {item.OrderTime}
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Expected Delivery Time
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {item.ExpectedDeliveryTime}
                  </Grid>
                </Grid>
                <br />
           
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Item Review
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {item.ItemReviewCount} ITEMS
                  </Grid>
                </Grid>
              </Grid>
    
              <Grid item xs={12} sm={6}>
                <label>Billing Details</label>
                <hr />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Status
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Guest
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Name
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    Olamide Baba nla
                  </Grid>
                </Grid>
    
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Billing Address
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    No 23, Olarokun Street.Off Ajoke Lewis. Amuwo Odofin Lagos State
                  </Grid>
                </Grid>
    
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Phone
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    +234 803 675 0000
                  </Grid>
                </Grid>
    
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Total
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    N 10000
                  </Grid>
                </Grid>
    
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Paid
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    N 1000
                  </Grid>
                </Grid>
    
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    Via Paystack
                  </Grid>
                  <Grid item xs={12} sm={6}></Grid>
                </Grid>
                <br />
                <Grid container justify="center">
                  <Button
                    variant="contained"
                    className={clsx(classes.confirmButton)}
                    type="submit"
                  >
                    CONFIRM
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            </Paper>
            <br/> &nbsp; &nbsp;
            </div>
            )
                
              })
            }
            </>
        }
        {
          props.rows.length === 0 && !props.isSearching &&
          <p>No record found</p>
        }
					
				</>
		)
}

