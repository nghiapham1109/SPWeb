import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  Box,
  Card,
  Link,
  Stack,
  Checkbox,
  TextField,
  Container,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { connect } from "react-redux";
import * as constant from "../constant-message";
//
const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));
const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));
//
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (emailError === "" && passwordError === "") {
      await props.onLogin(email, password);

      if (localStorage.getItem("token") !== null) {
        window.location.href = "/dashboard";
      }
    }
  };
  const onTextBoxEmail = (event) => {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const value = event.target.value;
    if (value.trim() === "") {
      setEmailError(constant.EMAIL_REQUIRED);
    } else if (!pattern.test(value)) {
      setEmailError(constant.EMAIL_TYPE);
    } else {
      setEmailError("");
      setEmail(value);
    }
  };
  const onTextBoxPassword = (event) => {
    if (event.target.value.trim() === "") {
      setPasswordError(constant.PASSWORD_REQUIRED);
    } else {
      setPasswordError("");
      setPassword(event.target.value);
    }
  };
  return (
    <Container sx={{ display: { xs: "flex" }, mt: 10 }}>
      <SectionStyle>
        <Typography
          variant="h4"
          sx={{ px: 5, mt: 10, mb: 5, fontWeight: "bold" }}
        >
          Hi, Welcome Back
        </Typography>
        <img src="/images/logo.png" />
      </SectionStyle>
      <Container sx={{ mt: 15, ml: 10 }}>
        <Stack sx={{ mb: 5 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", display: "flex" }}
          >
            Sign in to System
          </Typography>
          <Typography sx={{ color: "text.secondary", display: "flex" }}>
            Enter your details below.
          </Typography>
        </Stack>
        {<Box style={{ color: "red" }}>{props.error}</Box>}
        <form>
          <Stack spacing={3}>
            {<Box style={{ color: "red" }}>{emailError}</Box>}
            <TextField
              fullWidth
              type="email"
              label="Email address"
              onChange={(e) => onTextBoxEmail(e)}
            />
            {<Box style={{ color: "red" }}>{passwordError}</Box>}

            <TextField
              fullWidth
              autoComplete="current-password"
              type="password"
              label="Password"
              onChange={(e) => onTextBoxPassword(e)}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FormControlLabel
              control={<Checkbox checked={true} />}
              label="Remember me"
            />

            <Link variant="subtitle2" to="#">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Login
          </LoadingButton>
        </form>
      </Container>
    </Container>
  );
}
const mapStateToProps = (state) => {
  //   return {
  //     isSuccess: state.login.isSuccess,
  //     userId: state.login.userId,
  //     token: state.login.token,
  //     fullName: state.login.fullName,
  //     role: state.login.role,
  //     error: state.login.error,
  //     loading: state.login.loading,
  //   };
};

const mapDispatchToProps = (dispatch) => {
  //   return {
  //     onLogin: (email, password) => dispatch(actions.login(email, password)),
  //   };
};

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;
