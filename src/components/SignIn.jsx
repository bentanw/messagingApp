import { Button, Typography, Box, Paper } from "@material-ui/core";
import GoogleIcon from "@mui/icons-material/Google";

import firebase from "firebase/compat/app";
import { auth } from "../firebase.jsx";

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
            <Box pt={4}>
              <Typography variant="h5">React Message Chat</Typography>
            </Box>
            <Box pt={2} px={5}>
              <Typography variant="subtitle2">
                Sign Into Your Account By Logging Into Your Gmail Account
              </Typography>
            </Box>
            <Box pt={2} pb={4}>
              <Button
                size="small"
                variant="contained"
                startIcon={<GoogleIcon />}
                color="primary"
                onClick={signInWithGoogle}
              >
                Sign In With Google
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default SignIn;
