import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { LinkColor } from "src/constants/Colors";

interface IProps extends LinkProps {
  title: string;
}

export const PrimaryLink = ({ title, ...rest }: IProps) => {
  return (
    <Link {...rest} style={{ textDecoration: "none", color: LinkColor }}>
      {title}
    </Link>
  );
};

export const SuccessLink = ({ title, ...rest }: IProps) => {
  return (
    <Link {...rest} style={{ textDecoration: "none", color: "#44c168" }}>
      {title}
    </Link>
  );
};
