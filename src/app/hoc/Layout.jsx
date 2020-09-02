import React, {Suspense} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from '../components/Loader/Loader'
import Aux from "./_Aux";
import  AuthenticatedLayout from "./AuthenticatedLayout";
import SignIn from "app/views/sessions/SignIn";
import MatxLayout from "app/MatxLayout/MatxLayout";


export class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
     }




  render() {
    console.log("hissto",this.props)
    return (
      <Aux>
        
        {/* <ScrollToTop> */}
        {/* <Suspense fallback={<Loader/>}> */}
          {/* <Switch> */}
      <Router>
       
          {/* All unthenticated Routes will go here */}
          {/* login, reset-password, update-password */}
        <>
          <Route
            path={"/"}
            exact
            render={props => <SignIn  {...this.props}/>}
          />

        {/* All authenticated routes will be embedded in AuthenticatedLayout */}
          <Route
            path="/home"
            render={props => (
            <>
            <AuthenticatedLayout {...this.props}>
              <MatxLayout 
              {...this.props}
              />
            </AuthenticatedLayout>
            </>
            )}
          />
          </>


      </Router>
      {/* </Switch> */}
      {/* </Suspense> */}
      {/* </ScrollToTop> */}
      </Aux>
    );
  }
}


export default Layout;
