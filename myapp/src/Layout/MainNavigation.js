import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useLocation } from "react-router-dom";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const { pathname } = useLocation();

  const logoutHandler = () => {
    authCtx.logout();
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  let content;

  if (pathname === "/oldTasks") {
    content = (
      <Link to="/">
        <button>Add Task</button>
      </Link>
    );
  } else {
    content = (
      <Link to="/oldTasks">
        <button>Old Tasks</button>
      </Link>
    );
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">LunyoToDo</Link>
      </div>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        {authCtx.isLoggedIn && content}
        {!authCtx.isLoggedIn && (
          <Link to="/auth">
            <button>Login</button>
          </Link>
        )}
        {authCtx.isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
      </form>
    </header>
  );
};

export default MainNavigation;
