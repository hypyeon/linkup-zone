import { Slot, useSegments, useRouter } from "expo-router";
import "../global.css";
import { AuthProvider, useAuth } from "../context/auth";
import { useEffect } from "react";

const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inApp = segments[0] === "(app)";
    // check if user is authenticated
    if (typeof isAuthenticated === "undefined") {
      return;
    }
    if (isAuthenticated && !inApp) {
      // users redirected to dashboard
      router.replace("dashboard");
    } else if (isAuthenticated == false) {
      // users redirected to landing page
      router.replace("landing");
    }
  }, [isAuthenticated]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
