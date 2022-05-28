import { Button, ButtonProps } from "@mui/material";
import { ButtonColor } from "src/constants/Colors";

interface IProps extends ButtonProps {
  title: string;
}

export const PrimaryButton = ({ title, ...rest }: IProps) => {
  return (
    <Button
      style={{
        backgroundColor: ButtonColor,
        color: "#fff",
        paddingLeft: 35,
        paddingRight: 35,
        borderRadius: 10,
        textTransform: "none",
      }}
      variant="contained"
      {...rest}
    >
      {title}
    </Button>
  );
};
