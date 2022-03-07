import "./App.css";
import "./reset.css";
import MainHeader from "./component/layout/header";
import SideMenu from "./component/sideMenu/sidemenu";
import Router from "./pageRouter/pagerouter";

function App() {
  return (
    <>
      <div className="wrap">
        <MainHeader />
        <SideMenu />
        <Router />
      </div>
    </>
  );
}

export default App;
