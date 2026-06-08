import { TopBar_component } from "components/common";
import { Outlet } from "react-router";

export const Landing_Page = () => {
  return (
    <>
      <TopBar_component onMenu={() => {}} showMenu={false} />
      Landing_Page
      <Outlet />
    </>
  );
};

export default Landing_Page;
