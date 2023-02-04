import { Button, TextField } from "@mui/material";
import React from "react";
import { LOGIN_ROUTE } from "../../config/routes";
import {auth} from "../../config/firebase"
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
function SignupPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      // Create a new user with email and password using firebase
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log(
            "user created with email:" + email + "password" + password
          );
        })
        .catch((err) => console.log(err.message));
    }
      
    
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  
  console.log(email)


  console.log(password)
  console.log(confirmPassword)

  return (
    <main className="bg-disabled min-h-screen flex justify-center items-center">
      <div className="rounded-xl bg-white w-[40%] flex justify-center items-center flex-col space-y-4 p-16">
        <form className="w-[100%] space-y-4" onSubmit={register}> 
          <h1 className="font-[500] text-primary text-3xl">Create Account</h1>
          <h1 className="text-secondary mt-2">Sign up for new account</h1>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="fullName" className="text-sm font-semibold">
              Full Name
            </label>
            <TextField id="fullName" variant="outlined" size="small" />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold">
              Email or Phone
            </label>
            <TextField
              id="email"
              variant="outlined"
              type="email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <TextField
              id="password"
              variant="outlined"
              type="password"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1 flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-semibold">
              Confirm Password
            </label>
            <TextField
              id="confirmPassword"
              variant="outlined"
              type="password"
              size="small"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button variant="contained" className="w-full" type="submit">
            Sign up
          </Button>
          <div className="text-center">
            <p className="text-secondary text-[0.86em]">
              Already have an account?{" "}
              <Button href={LOGIN_ROUTE}>
                <label className="font-[600] text-[0.88em]">Sign in</label>
              </Button>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SignupPage;
