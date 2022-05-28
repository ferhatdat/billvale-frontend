import { AccessTimeOutlined } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { PrimaryButton } from "src/components/Buttons";
import { CountToTime } from "src/helpers";

interface IProps {
  mobile: string;
  handleSubmit: CallableFunction;
}

const OtpView = ({ mobile, handleSubmit }: IProps) => {
  const [otp, setOtp] = useState("");
  const [countDown, setCountDown] = useState(120);

  useEffect(() => {
    let timer: any = null;
    timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return prev;
        } else return prev - 1;
      });
    }, 1100);
    return () => timer;
  }, []);

  return (
    <div>
      <Typography fontWeight="bold" fontSize={25}>
        VERIFY OTP
      </Typography>
      <Typography color="text.secondary" fontSize={14} ml={2}>
        Enter OTP sent to {mobile}
      </Typography>
      <Stack marginTop={7} alignItems="center">
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
      </Stack>
      <Stack
        direction="row"
        justifyContent={"center"}
        alignItems={"center"}
        mt={2}
      >
        <Typography>{CountToTime(countDown)}</Typography>
        <AccessTimeOutlined />
      </Stack>
      <Stack alignItems="center" mt={5}>
        <PrimaryButton
          title="Verify OTP"
          type="button"
          size="large"
          onClick={() => {
            if (otp.length !== 6) {
              toast("Please enter valid OTP", { type: "error" });
            } else {
              handleSubmit(otp);
            }
          }}
        />
      </Stack>
    </div>
  );
};

export default OtpView;
