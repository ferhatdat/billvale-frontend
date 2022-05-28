import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import GuestElement from "./elements/GuestElement";
import View from "./views";
import Login from "./views/auth/Login";
import RegisterView from "./views/auth/Register";
import SetPasswordView from "./views/auth/SetPassword";

function App() {
  const theme = createTheme({});

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />}>
            <Route index element={<View />} />
          </Route>
          <Route path="/auth" element={<GuestElement />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<RegisterView />} />
            <Route path="set-password" element={<SetPasswordView />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
