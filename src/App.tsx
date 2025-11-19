import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/auth/AuthContext";
import AppRouter from "./routers/AppRouter";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <AppRouter />
      </AuthContextProvider>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}
