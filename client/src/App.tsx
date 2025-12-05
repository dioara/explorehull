import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Explore from "./pages/Explore";
import Events from "./pages/Events";
import EatDrink from "./pages/EatDrink";
import Stay from "./pages/Stay";
import Blog from "./pages/Blog";
import Maritime from "./pages/Maritime";
import TravelInfo from "./pages/TravelInfo";
import Contact from "./pages/Contact";
import AttractionDetail from "./pages/AttractionDetail";
import EventDetail from "./pages/EventDetail";
import RestaurantDetail from "./pages/RestaurantDetail";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/search" component={SearchResults} />
      <Route path={"/explore"} component={Explore} />
      <Route path={"/events"} component={Events} />
      <Route path={"/eat-drink"} component={EatDrink} />
      <Route path={"/stay"} component={Stay} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/maritime"} component={Maritime} />
      <Route path={"/travel-info"} component={TravelInfo} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/attraction/:slug"} component={AttractionDetail} />
      <Route path={"/event/:slug"} component={EventDetail} />
      <Route path={"/restaurant/:slug"} component={RestaurantDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
