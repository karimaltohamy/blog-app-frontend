import axios from "axios";
import React, { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mainContext } from "../mainContext";

const Header = () => {
  const { user, setUser } = useContext(mainContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("api/logout");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-between py-3">
      <Link to="/" className="font-bold text-lg md:text-2xl">
        My Blog
      </Link>

      <div className="flex items-center gap-2">
        {!user ? (
          <Fragment>
            <Link
              to={"/login"}
              className="bg-gray-300 text-sm md:text-md py-1 px-2 md:px-3 rounded-md font-semibold"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="border border-gray-300 ptext-sm md:text-md py-1 px-2 md:px-3 rounded-md font-semibold"
            >
              Register
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link
              to={"/createPost"}
              className="bg-gray-300 text-sm md:text-md py-1 px-2 md:px-3 rounded-md font-semibold"
            >
              Create Post
            </Link>
            <span
              onClick={handleLogout}
              className="border border-gray-300 text-sm md:text-md py-1 px-2 md:px-3 rounded-md font-semibold cursor-pointer"
            >
              Logout
            </span>
            <span className="font-semibold">({user.username})</span>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
