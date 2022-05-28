import { PhoneAndroidOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { PrimaryButton } from "src/components/Buttons";
import FormInput from "src/components/Input";
import { PrimaryLink } from "src/components/Links";
import { phoneRegExp } from "src/helpers";
import { object, string } from "yup";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterView = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const validationSchema = object().shape({
    mobile: string()
      .matches(phoneRegExp, "Please enter valid mobile number")
      .min(10)
      .max(10)
      .required("This field is required"),
  });

  const form = useFormik({
    initialValues: {
      mobile: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setOtpSent(true);
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Typography fontWeight="bold" fontSize={25}>
        Register
      </Typography>
      {!otpSent && (
        <Typography color="text.secondary" fontSize={15}>
          Enter your mobile number to continue
        </Typography>
      )}
      {otpSent && (
        <Typography color="text.secondary" fontSize={15}>
          Enter OTP sent to {form.values.mobile}
        </Typography>
      )}
      <Stack marginTop={7} alignItems="center">
        {!otpSent && (
          <FormInput
            id="mobile"
            form={form}
            label="Input your Mobile"
            prefixComponent={<PhoneAndroidOutlined />}
            type={"number"}
            fullWidth
          />
        )}

        {otpSent && (
          <OtpInput
            value={otp}
            numInputs={6}
            onChange={(otp: any) => setOtp(otp)}
            inputStyle={{
              height: 40,
              width: 40,
              marginRight: 10,
              borderRadius: 5,
            }}
          />
        )}
      </Stack>
      <Stack alignItems="center" mt={5}>
        {!otpSent && (
          <Stack direction="row" justifyContent="flex-end" width="100%" mb={1}>
            <PrimaryLink to="/auth/login" title="Already have an account" />
          </Stack>
        )}
        {!otpSent && (
          <PrimaryButton
            title="Send OTP"
            type="submit"
            size="large"
            disabled={otpSent}
          />
        )}

        {otpSent && (
          <PrimaryButton
            title="Verify OTP"
            type="button"
            size="large"
            onClick={() => {
              if (otp.length !== 6) {
                toast("Please enter valid OTP", { type: "error" });
              } else {
                console.log(otp);
                navigate("/auth/set-password");
              }
            }}
            disabled={!otpSent}
          />
        )}

        <Typography color="text.secondary" mt={5} fontSize={12}>
          By registering, I agree Billvale’s{" "}
          <PrimaryLink title="Privacy Policy" to="#" /> and{" "}
          <PrimaryLink to="#" title="Terms of Service" />
        </Typography>
      </Stack>
    </form>
  );
};

export default RegisterView;
