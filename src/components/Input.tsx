import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  StandardTextFieldProps,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { ReactNode, useState } from "react";

interface IProps extends StandardTextFieldProps {
  form: any;
  id: string;
  prefixComponent?: ReactNode;
  postfixComponent?: ReactNode;
}

export const PasswordInput = ({
  postfixComponent: PostfixComponent,
  ...rest
}: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormInput
      {...rest}
      type={showPassword ? "text" : "password"}
      postfixComponent={
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      }
    />
  );
};

const FormInput = ({
  id,
  form,
  prefixComponent: PrefixComponent,
  postfixComponent: PostfixComponent,
  ...rest
}: IProps) => {
  return (
    <TextField
      id={id}
      value={form.values[id]}
      error={form.touched[id] && Boolean(form.errors[id])}
      helperText={form.touched[id] && form.errors[id]}
      onChange={form.handleChange}
      InputProps={{
        startAdornment: PrefixComponent && (
          <InputAdornment position="start">{PrefixComponent}</InputAdornment>
        ),
        endAdornment: PostfixComponent && (
          <InputAdornment position="start">{PostfixComponent}</InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default FormInput;
