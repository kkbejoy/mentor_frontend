import { Outlet } from "react-router-dom";

export function Home() {
  return (
    <>
      <Outlet />
    </>
  );
}

export function Moderator() {
  return (
    <>
      <Outlet />
    </>
  );
}
