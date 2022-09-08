import { Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./Layout/Layout";
import AuthPage from "./pages/AuthPage";
import OldTasks from "./pages/OldTasks";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/oldTasks">
          <OldTasks />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
