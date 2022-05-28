import { VpnKey } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { PrimaryButton } from "src/components/Buttons";
import FormInput, { PasswordInput } from "src/components/Input";
import * as Yup from "yup";

const SetPasswordView = () => {
  const validationSchema = Yup.object().shape({
    showPassword: Yup.boolean().default(false),
    newPass: Yup.string().required("this field is required"),
    confirmPass: Yup.string()
      .required("this field is required")
      .oneOf([Yup.ref("password")], "Passwords not match"),
  });

  const form = useFormik({
    initialValues: {
      newPass: "",
      confirmPass: "",
      showPassword: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form action="#" onSubmit={form.handleSubmit}>
      <Typography fontWeight="bold" fontSize={25}>
        Set Your Account Password
      </Typography>
      <Stack marginTop={7} alignItems="center">
        <PasswordInput
          id="newPass"
          form={form}
          label="Input your password"
          prefixComponent={<VpnKey />}
          fullWidth
          autoComplete="off"
        />
        <FormInput
          id="confirmPass"
          form={form}
          label="Conform password"
          prefixComponent={<VpnKey />}
          type={"password"}
          fullWidth
          style={{
            marginTop: 25,
            marginBottom: 40,
          }}
          autoComplete="off"
        />
        <PrimaryButton title="Confirm" type="submit" />
      </Stack>
    </form>
  );
};

export default SetPasswordView;
