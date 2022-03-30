import "./App.css";
import "./reset.css";
import MainHeader from "./component/layout/header";
import SideMenu from "./component/sideMenu/sidemenu";
import Router from "./pageRouter/pagerouter";
import Login from "./page/login";

function App() {
    return (
        <>
            <Login />
            <div className='wrap main'>
                <MainHeader />
                <SideMenu />
                <Router />
            </div>
        </>
    );
}

export default App;
