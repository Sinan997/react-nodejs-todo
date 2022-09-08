import AddTask from "../components/AddTask";
import { Fragment } from "react";
import Tasks from "../components/Tasks";
import AuthContext from "../store/auth-context";
import { useContext } from "react";

const MainPage = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Fragment>
      <AddTask />
      {authCtx.isLoggedIn && <Tasks />}
    </Fragment>
  );
};

export default MainPage;
