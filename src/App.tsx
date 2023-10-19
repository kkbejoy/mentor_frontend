import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export function Home() {
  return (
    <>
      <Outlet /> <Toaster />
    </>
  );
}

export function Moderator() {
  return (
    <>
      <Outlet /> <Toaster />
    </>
  );
}

export function Mentee() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
export function Mentor() {
  return (
    <>
      <Outlet /> <Toaster />
    </>
  );
}
