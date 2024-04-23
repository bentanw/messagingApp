import * as React from "react";
import firebase from "firebase/compat/app";
import { auth } from "../firebase.jsx";

import { Button, Typography, Box, Paper } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import signInBackground from "../assets/background.jpeg";

const styles = {
  paperContainer: {
    backgroundImage: `url(${signInBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  },
};

function SignIn() {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <Paper style={styles.paperContainer}>
        <Box sx={{ pt: 18, textAlign: "center" }}>
          <Box
            sx={{
              display: "inline-block",
              textAlign: "center",
              bgcolor: "white",
              borderRadius: "5%",
              width: 300,
            }}
          >
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>React Message Chat</CardTitle>
                <CardDescription>
                  Sign Into Your Account By Logging Into Your Gmail Account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  color="primary"
                  onClick={signInWithGoogle}
                >
                  Sign In With Google
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default SignIn;
