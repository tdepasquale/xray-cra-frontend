import React, { useReducer, useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./Components/ScrollToTop";
import {
  userInitialState,
  userReducer,
  IAction,
  IState,
  setUserAction,
} from "./contexts/UserContext";
import Navbar from "./Components/Navbar";
import agent from "./agent";
import LoadingComponent from "./Components/Loading";
import { createBrowserHistory } from "history";
import { ToastContainer, toast } from "react-toastify";
import { PrivacyPolicy } from "./Components/PrivacyPolicy";
import { TermsOfUse } from "./Components/TermsOfUse";
import { Footer } from "./Components/Footer";
import { TechniqueChartDemo } from "./Components/TechniqueChartDemo";
import { MyTechniqueCharts } from "./Components/MyTechniqueCharts";
import { TechniqueChartView } from "./Components/TechniqueChartView";
import { TechniqueChartEdit } from "./Components/TechniqueChartEdit";
import { NotFound } from "./Components/NotFound";
import { Unauthorized } from "./Components/Unauthorized";
import { ComposeBlog } from "./Components/ComposeBlog";
import { MyBlogPosts } from "./Components/MyBlogPosts";
import { Admin } from "./Components/Admin";
import { PostsToApprove } from "./Components/PostsToApprove";
import { HomePage } from "./Components/HomePage";
import { PositioningGuidesPage } from "./Components/PositioningGuidesPage";
import { ViewBlogPage } from "./Components/ViewBlogPage";
import { MyPositioningGuides } from "./Components/MyPositioningGuides";
import { PositioningGuidesToApprove } from "./Components/PositioningGuidesToApprove";
import {
  IUtilityState,
  IUtilityAction,
  utilityReducer,
  utilityInitialState,
} from "./contexts/UtilityContext";

interface IUserContext {
  userData: IState;
  dispatch: React.Dispatch<IAction>;
}

interface IUtilityContext {
  utilityData: IUtilityState;
  utilityDispatch: React.Dispatch<IUtilityAction>;
}

export const history = createBrowserHistory();

export const UserContext = React.createContext<null | IUserContext>(null);

export const UtilityContext = React.createContext<null | IUtilityContext>(null);

const App: React.FC = () => {
  const [appLoaded, setAppLoaded] = useState(false);
  const [userData, dispatch] = useReducer(userReducer, userInitialState);
  const [utilityData, utilityDispatch] = useReducer(
    utilityReducer,
    utilityInitialState
  );

  const getUser = async () => {
    try {
      const user = await agent.User.current();
      dispatch!(setUserAction(user));
    } catch (error) {
      toast.error("Error getting user");
    }
  };

  useEffect(() => {
    if (userData.token) {
      window.sessionStorage.setItem("jwt", userData.token);
      getUser().finally(() => setAppLoaded(true));
    } else {
      window.sessionStorage.removeItem("jwt");
      setAppLoaded(true);
    }
  }, [userData.token]);

  if (!appLoaded) return <LoadingComponent content="Loading app..." />;

  const Content = () => {
    return (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/positioning-guides" exact>
          <PositioningGuidesPage />
        </Route>
        <Route path="/technique-chart-demo">
          <TechniqueChartDemo />
        </Route>
        <Route path="/my-technique-charts">
          <MyTechniqueCharts />
        </Route>
        <Route path="/technique-chart/view/:id">
          <TechniqueChartView />
        </Route>
        <Route path="/technique-chart/edit/:id">
          <TechniqueChartEdit />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/my-blog-posts">
          <MyBlogPosts />
        </Route>
        <Route path="/my-positioning-guides">
          <MyPositioningGuides />
        </Route>
        <Route path="/blog-posts-to-approve">
          <PostsToApprove />
        </Route>
        <Route path="/positioning-guides-to-approve">
          <PositioningGuidesToApprove />
        </Route>
        <Route path="/compose-blog/:id">
          <ComposeBlog />
        </Route>
        <Route path="/blog/:name/:id">
          <ViewBlogPage />
        </Route>
        <Route path="/privacy-policy" exact>
          <PrivacyPolicy />
        </Route>
        <Route path="/terms-of-use" exact>
          <TermsOfUse />
        </Route>
        <Route path="/not-found">
          <NotFound />
        </Route>
        <Route path="/unauthorized">
          <Unauthorized />
        </Route>
      </Switch>
    );
  };

  return (
    <UserContext.Provider value={{ dispatch, userData }}>
      <UtilityContext.Provider value={{ utilityDispatch, utilityData }}>
        <Router history={history}>
          <ToastContainer position="bottom-right" />
          <ScrollToTop />
          <Navbar />
          <Content />
          <Footer />
        </Router>
      </UtilityContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
