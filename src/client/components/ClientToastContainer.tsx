import { useAppStore } from "@client/ZustandContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ClientToastContainer() {

  const { theme } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme={theme}
  />
}