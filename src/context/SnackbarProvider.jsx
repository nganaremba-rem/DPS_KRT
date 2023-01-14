import { createContext, useState } from "react";
import SnackbarCustom from "../components/SnackbarCustom";

export const SnackbarContext = createContext();

const SnackbarProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
  });
  const [alertOptions, setAlertOptions] = useState({
    text: "ERROR. Please set a message",
    severity: "success",
  });

  const handleClose = () => setToast((prev) => ({ ...prev, open: false }));
  const openSnackbar = () => setToast((prev) => ({ ...prev, open: true }));

  return (
    <SnackbarContext.Provider
      value={{
        setAlertOptions,
        openSnackbar,
      }}
    >
      <SnackbarCustom
        alertText={alertOptions.text}
        onClose={handleClose}
        open={toast.open}
        severity={alertOptions.severity}
      />
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
