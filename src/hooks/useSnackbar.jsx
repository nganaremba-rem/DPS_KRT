import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarProvider";

export const useSnackbar = () => useContext(SnackbarContext);
