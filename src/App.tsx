import { AuthProvider } from "./context/AuthContext";
import AppRouter from "./routers/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
