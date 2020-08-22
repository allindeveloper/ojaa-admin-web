import axios from "axios";
import localStorageService from "./localStorageService";
import { LOGIN, USER } from "Constants";

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

  // You need to send http request with email and passsword to your server in this method
  // Your server will return user object & a Token
  // User should have role property
  // You can define roles in app/auth/authRoles.js
  loginWithEmailAndPassword = (email, password, loginService) => {
    return new Promise((resolve, reject) => {
      const payload ={
        user : email,
        password: password
      }
      loginService.userLogin(payload,LOGIN)
      .then((response)=>{
        console.log("response on login", response.data)
        if(response.data.status === "ok"){
        const user = {
          token:response.data.token,
          ...response.data.user
        }
        
        resolve(user);
      }else{
        reject(response.data)
      }
      })
      .catch((err)=>{
        if(err){
        console.log("err on login", err.response.data)
        reject(err.response.data)
        }
      })
      // setTimeout(() => {
        
      // }, 1000);
    }).then(data => {
      console.log("data afetr first ling", data)
      // Login successful
      // Save token
      this.setSession(data.token, data._id);
      // Set user
      this.setUser(data);
      return data;
    });
  };

  // You need to send http requst with existing token to your server to check token is valid
  // This method is being used when user logged in & app is reloaded
  loginWithToken = async (loginService) => {
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
        if(err){
        console.log("err on login", err.response.data)
        reject(err.response.data)
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
    this.setSession(null);
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = (token,id) => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      localStorage.setItem("_id", JSON.stringify(id));
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      // localStorage.removeItem("jwt_token");
      // localStorage.removeItem("_id");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {    
    localStorageService.setItem("auth_user", user);
  }
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new JwtAuthService();
