import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { haveJWTToken } from "./helper/authorized/authorized.helper";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (haveJWTToken()) navigate("/contacts");
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
