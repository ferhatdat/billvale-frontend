import { Backdrop, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import LoginBackground from "src/assets/images/login-background.png";
import Logo from "src/assets/images/logo.png";
import { SideBarColor } from "src/constants/Colors";

const GuestElement = () => {
  return (
    <Stack
      direction={{
        sm: "row",
        xs: "column",
      }}
      minHeight="100%"
    >
      <Stack
        width={"60vw"}
        display={{
          xs: "none",
          sm: "block",
        }}
      >
        <img
          alt="login-background"
          src={LoginBackground}
          style={{ height: "100%", width: "90%" }}
        />
      </Stack>

      <Stack
        direction="row"
        display={{
          xs: "block",
          sm: "none",
        }}
        style={{
          height: "100vh",
          width: "100vW",
          backgroundColor: SideBarColor,
        }}
      >
        <Backdrop open={true}>
          <Stack alignItems="center" mt={10}>
            <img alt="Billvale" src={Logo} height={40} />
            <Card
              style={{ margin: 0, marginTop: 50, width: "90vw", padding: 10 }}
            >
              <CardContent>
                <Outlet />
              </CardContent>
            </Card>
          </Stack>
        </Backdrop>
      </Stack>

      <Stack
        justifyContent="center"
        display={{
          xs: "none",
          sm: "block",
        }}
        mt={10}
      >
        <Card
          style={{
            minWidth: 550,
            minHeight: 300,
            padding: 20,
            borderRadius: 20,
            marginLeft: -160,
          }}
        >
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default GuestElement;
