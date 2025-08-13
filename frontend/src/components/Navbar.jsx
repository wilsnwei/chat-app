import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const authUser = useAuthStore((state) => state.authUser);
  // const login = useAuthStore((state) => state.login);
  const login = () => {
    console.log("login");
  };
  return (
    <div>
      <button onClick={() => (!authUser ? login() : logout())}>
        {!authUser ? <Link to="/login">Login</Link> : "Logout"}
      </button>
    </div>
  );
};

export default Navbar;
