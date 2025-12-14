import "./index.css";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";


// TODO: add pending navigation indicators...
//  const navigation = useNavigation();
//  const isNavigating = Boolean(navigation.location);
//  {isNavigating && ...}
//
//  When a form is submitted, the UI should immediately respond to the user's actions with a pending state. This is easiest to do with a fetcher form because it has its own independent state (whereas normal forms cause a global navigation).
// {fetcher.state !== "idle"
//   ? "Submitting..."
//   : "Submit"}

export default function App() {
  return (
    <div className="flex h-full w-full max-w-screen flex-col items-center bg-darkbrown text-orange-200 inset-shadow-sm/70">
      <Header />
      <Outlet />
    </div>
  );
}
