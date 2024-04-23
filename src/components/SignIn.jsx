import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { auth } from "../firebase.jsx";

import { Button, Paper } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import signInBackground from "../assets/background.jpeg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function registerAccount() {
    if (signInPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    auth
      .createUserWithEmailAndPassword(signInEmail, signInPassword)
      .then((userCredential) => {
        // Account creation successful
        console.log("Account created successfully:", userCredential.user);
        setError(""); // Clear any previous errors
      })
      .catch((error) => {
        // Handle Errors here.
        setError(error.message);
        console.error("Error creating user:", error);
      });
  }

  function signInWithEmail() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-in successful.
        console.log("Logged in with email and password:", userCredential.user);
      })
      .catch((error) => {
        // Handle Errors here.
        setError(error.message);
        console.error("Error signing in with email and password:", error);
      });
  }

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        {/* Left image */}
        <div className="hidden bg-muted lg:block">
          <Paper
            style={{
              backgroundImage: `url(${signInBackground})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
            }}
          />
        </div>

        {/* Right sign in options */}
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                  required
                />
              </div>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={signInWithEmail}
              >
                Login
              </Button>
              <Button
                size="medium"
                variant="contained"
                startIcon={<GoogleIcon />}
                color="secondary"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </Button>

              {/* Register an account */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Register An Account</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create an Account</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      onChange={(e) => setSignInEmail(e.target.value)}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                      onChange={(e) => setSignInPassword(e.target.value)}
                      id="password"
                      type="password"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Confirm Your Password</Label>
                    </div>
                    <Input
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      id="confirmPassword"
                      type="confirmPassword"
                      required
                    />
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      onClick={registerAccount}
                    >
                      Sign Up
                    </Button>
                    <DialogClose asChild>
                      <Button variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
