import axios from "axios";
import localStorageService from "./localStorageService";
import { LOGIN, USER } from "Constants";
import { toast } from "react-toastify";

class JwtAuthService {

  // Dummy user object just for the demo
  // user = {
  //   userId: "1",
  //   role: 'ADMIN',
  //   displayName: "Uchendu Precious",
  //   email: "uchendubozz@gmail.com",
  //   photoURL: "/assets/images/face-6.jpg",
  //   age: 25,
  //   token: "blahblah"
  // }



  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = async (loginService,history) => {
    return new  Promise( async (resolve, reject) => {
      // setTimeout(() => {
      //   resolve(this.user);
      // }, 100);
      const id = JSON.parse(localStorage.getItem("_id"));
      await loginService.getUserById(USER,id)
      .then((response)=>{
        if(response.data.status === "ok"){
        const user = {
          ...response.data.user
        }
        
        resolve(user);
      }else{
        reject(response.data)
      }
      })
      .catch((err)=>{
        if(err.response === undefined){
        //console.log("err on login", err.response.data)
        // reject(err.response.data)
        toast.error( "Check your network or try again", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose:3000
        });
        history.push("/session/signin")
        }
      })
    }).then(data => {
      console.log("data afetr first ling", data)
      // Token is valid
      this.setSession(data.token);
      this.setUser(data);
      return data;
    });
  };

  logout = () => {
    localStorage.removeItem("OJAA_");
    localStorage.removeItem("OJAA_USER");
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = (token,id) => {
    if (token) {
      localStorage.setItem("OJAA_", JSON.stringify(token));
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      // localStorage.removeItem("jwt_token");
      // localStorage.removeItem("_id");
     // delete axios.defaults.headers.common["Authorization"];
    }
  };

  setAuth = (token) =>{
    // debugger;
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  // Save user to localstorage
  setUser = (user) => {    
    localStorageService.setItem("OJAA_USER", user);
  }
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("OJAA_USER");
  }
}

export default new JwtAuthService();
