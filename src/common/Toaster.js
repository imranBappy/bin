import { Toaster as HotToaster } from "react-hot-toast";
const Toaster = () => {
  return (
    <HotToaster
      position="bottom-left"
      toastOptions={{
        className: "",
        duration: 5000,
        success: {
          duration: 3000,
          theme: {
            primary: "green",
            secondary: "black",
          },
        },
      }}
    />
  );
};

export default Toaster;
