import { Outlet } from "react-router-dom";
import Logo from "../components/Logo/Logo";

const MainLayout = () => {
  return (
    <>
      <Logo />
      <Outlet />
    </>
  );
};

export default MainLayout;
