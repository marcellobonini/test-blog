import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col">
      <Header/>
      <div className="h-full flex flex-col items-center m-8">
        <Outlet/>
      </div>
    </div>
  )
}