import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ColorModeSelect from "../../../../theme/ColorModeSelect";

import { LogoWithName } from "../../../../components/icons/Logo";
import CONFIG_COLORS from "../../../../constants/colors";
import { UserType } from "../../../../types/users";
import loginRequest from "../../../../utils/requests/auth/loginRequest";
import { BaseResponse } from "../../../../utils/requests/responses";
import { validateLogin, validatePassword } from "../../../../validators/auth";
import ForgotPassword from "./ForgotPassword";

import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/userContext"; // votre contexte

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  marginLeft: "50vw",
  transform: "translateX(-50%)",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: `${CONFIG_COLORS.card.shadow_light_primary} 0px 5px 15px 0px, ${CONFIG_COLORS.card.shadow_light_secondary} 0px 15px 35px -5px`,
  ...theme.applyStyles("dark", {
    boxShadow: `${CONFIG_COLORS.card.shadow_dark_primary} 0px 5px 15px 0px, ${CONFIG_COLORS.card.shadow_dark_secondary} 0px 15px 35px -5px`,
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: `radial-gradient(ellipse at 50% 50%, ${CONFIG_COLORS.background.light_gradient_center}, ${CONFIG_COLORS.background.light_gradient_edge})`,
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage: `radial-gradient(at 50% 50%, ${CONFIG_COLORS.background.dark_gradient_center}, ${CONFIG_COLORS.background.dark_gradient_edge})`,
    }),
  },
}));

export default function SignIn() {
  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const { setUser, setToken } = useUser();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (!validateInputs()) {
        return;
      }

      const data = new FormData(event.currentTarget);
      const loginData = {
        login: data.get("login") + "",
        password: data.get("password") + "",
        remember: !!data.get("remember"),
      };

      const response = (await loginRequest(loginData)) as BaseResponse<{
        user: UserType;
        token: string;
      } | null>;

      if (response.ok) {
        // Vérifier si le token existe
        if (response.data?.token) {
          // Sauvegarder le token (localStorage ou sessionStorage)
          localStorage.setItem("token", response.data.token);

          // Ajouter user au contexte
          setUser(response.data.user);
          setToken(response.data.token);

          // Naviguer vers /app
          navigate("/app/");
        } else {
          alert("Erreur dans la réponse serveur");
        }
      } else {
        alert(response.error?.message || "Erreur de connexion");
        alert("erreur");
      }
    } catch (error) {
      alert("Une erreur est survenue");
      console.log(error);
    }

    // TODO: Implémenter la logique de soumission du formulaire
    // Exemple: appel API, redirection, etc.
  };

  const validateInputs = () => {
    const login = document.getElementById("login") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    const loginValidationError = validateLogin(login.value);
    if (loginValidationError) {
      setLoginError(true);
      setLoginErrorMessage(loginValidationError);
      isValid = false;
    } else {
      setLoginError(false);
      setLoginErrorMessage("");
    }

    const passwordValidationError = validatePassword(password.value);
    if (passwordValidationError) {
      setPasswordError(true);
      setPasswordErrorMessage(passwordValidationError);
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Card variant="outlined">
        <LogoWithName />
        <Typography
          component="h1"
          variant="h6"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Connexion{" "}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="login">Login</FormLabel>
            <TextField
              error={loginError}
              helperText={loginErrorMessage}
              id="login"
              type="login"
              name="login"
              placeholder="login_123"
              autoComplete="login"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={loginError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Mot de passe</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••••"
              type="password"
              id="password"
              // autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox value="remember" name="remember" color="primary" />
            }
            label="Se souvenir de moi"
          />
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Se connecter
          </Button>
          <Link
            component="button"
            type="button"
            onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Mot de passe oublié ?
          </Link>
        </Box>
        <Divider></Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Google")}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Sign in with Facebook
          </Button> */}
          <Typography sx={{ textAlign: "center" }}>
            Pas de compte ?{" "}
            <Link
              href="/contact-us"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Contactez l'administration.
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
}
