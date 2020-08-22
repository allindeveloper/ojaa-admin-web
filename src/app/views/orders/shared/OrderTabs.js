import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ShoppingCartOutlined from '@material-ui/icons/ShoppingCartOutlined';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewOrders from './NewOrders';
import { Container } from '@material-ui/core';
import CompletedOrders from './CompletedOrders';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
        <Box p={3}>
            {children}
        </Box>
    </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function OrderTabs(props) {
  const classes = useStyles();
  const initialTabIndex= props.incomingTab;
  const [value, setValue] = React.useState(initialTabIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="Orders categories"
        >
          <Tab label="New Orders" icon={<AddShoppingCart />} {...a11yProps(0)} />
          <Tab label="Active Orders" icon={<ShoppingBasket />} {...a11yProps(1)} />
          <Tab label="Completed Orders" icon={<ShoppingCartOutlined />} {...a11yProps(2)} />
         </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <NewOrders {...props}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Active Orders
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CompletedOrders {...props} />
      </TabPanel>
    </div>
  );
}
