import { Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import LoadingButton from "./LoadingButton";

const ButtonWithLoading = ({
  key,
  isLoading = false,
  text,
  color = "primary",
  size = "large",
  variant = "contained",
  endIcon,
  type = "submit",
  onClick = () => {},
}) => {
  useEffect(() => {
    // console.log(isLoading);
  }, [isLoading]);

  return (
    <>
      {isLoading === true ? (
        <LoadingButton key={key} />
      ) : (
        <Button
          key={key}
          color={color}
          size={size}
          variant={variant}
          endIcon={endIcon}
          className={"col-span-full"}
          type={type}
          onClick={onClick}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonWithLoading;
