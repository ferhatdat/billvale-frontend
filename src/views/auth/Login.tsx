import {
  KeyOutlined,
  MailOutline,
  PhoneAndroidOutlined,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { PrimaryButton } from "src/components/Buttons";
import FormInput, { PasswordInput } from "src/components/Input";
import { PrimaryLink, SuccessLink } from "src/components/Links";
import { phoneRegExp } from "src/helpers";
import * as Yup from "yup";
import OtpView from "./OtpView";

const Login = () => {
  const validationSchema = Yup.object().shape({
    otpLogin: Yup.boolean().default(true),
    username: Yup.string()
      .required("This field is required")
      .when("otpLogin", {
        is: true,
        then: Yup.string()
          .matches(phoneRegExp, "Please enter valid mobile")
          .min(10)
          .max(10)
          .required("This field is required"),
      }),
    password: Yup.string().when("otpLogin", {
      is: false,
      then: Yup.string().required("This field is required"),
    }),
  });

  const [otpSent, setOtpSent] = useState(false);

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
      otpLogin: false,
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.otpLogin) {
        setOtpSent(true);
      } else {
        console.log(values);
      }
    },
  });

  if (otpSent)
    return (
      <OtpView
        mobile={form.values.username}
        handleSubmit={(otp: number) => {
          console.log(otp);
        }}
      />
    );

  return (
    <form onSubmit={form.handleSubmit}>
      <Typography fontWeight="bold" fontSize={25}>
        Login
      </Typography>
      <Typography color="text.secondary" fontSize={15}>
        Enter your {form.values.otpLogin ? "mobile" : "username and password"}{" "}
        to login
      </Typography>
      <Stack marginTop={7}>
        <FormInput
          id="username"
          form={form}
          label={
            form.values.otpLogin
              ? "Input your mobile"
              : "Input your mobile or email"
          }
          prefixComponent={
            form.values.otpLogin ? <PhoneAndroidOutlined /> : <MailOutline />
          }
        />
        {!form.values.otpLogin && (
          <PasswordInput
            id="password"
            form={form}
            label="Input your password"
            prefixComponent={<KeyOutlined />}
            style={{
              marginTop: 25,
            }}
          />
        )}
      </Stack>

      <Stack alignItems="center" mt={5}>
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          mb={1}
        >
          {!form.values.otpLogin && (
            <PrimaryLink title="Forgot password" to="#" />
          )}
          <SuccessLink title="Register new" to="/auth/register" />
        </Stack>
        <PrimaryButton title="Login" type="submit" size="large" />
        <Button
          title="Login via OTP"
          size="small"
          variant="outlined"
          style={{ marginTop: 15 }}
          onClick={() =>
            form.setFieldValue("otpLogin", !Boolean(form.values.otpLogin))
          }
        >
          Login via {form.values.otpLogin ? "Email" : "OTP"}?
        </Button>
        <Typography color="text.secondary" mt={5} fontSize={12}>
          By Loggin in, I agree Billvale’s{" "}
          <PrimaryLink title="Privacy Policy" to="#" /> and{" "}
          <PrimaryLink to="#" title="Terms of Service" />
        </Typography>
      </Stack>
    </form>
  );
};

export default Login;
