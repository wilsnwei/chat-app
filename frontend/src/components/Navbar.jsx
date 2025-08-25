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
    <div className="flex gap-3 justify-evenly text-xl">
      <button>{<Link to="/profile">Profile</Link>}</button>
      <button>{<Link to="/settings">Settings</Link>}</button>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => (!authUser ? login() : logout())}
      >
        {!authUser ? <Link to="/login">Login</Link> : "Logout"}
      </button>
    </div>
  );
};

export default Navbar;
