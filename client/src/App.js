import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import EventsPage from "./pages/EventsPage";

import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={EventsPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;