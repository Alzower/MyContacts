import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { haveJWTToken } from "../../helper/authorized/authorized.helper";

function Contacts() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!haveJWTToken()) navigate("/");
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
}

export default Contacts;
