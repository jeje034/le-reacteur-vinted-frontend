import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./components/Header";
import Signup from "./containers/Signup";
import Login from "./containers/Login";

function App() {
    const [token, setToken] = useState(Cookies.get("token") || null);
    const [titleSearch, setTitleSearch] = useState("");
    const [priceRange, setPriceRange] = useState([0, 500]); //msgjs21 voir pour constantes en fonction de la réponse sur la route "/"

    const setTokenInMemoryAndInCookie = (token) => {
        setToken(token);
        if (token) {
            Cookies.set("token", token, { expires: 7 });
        } else {
            Cookies.remove("token");
        }
    };

    return (
        <Router>
            <Header
                token={token}
                setTokenInMemoryAndInCookie={setTokenInMemoryAndInCookie}
                titleSearch={titleSearch}
                setTitleSearch={setTitleSearch}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
            />
            <Switch>
                <Route path="/offer/:id">
                    <Offer />
                </Route>
                <Route path="/signup">
                    <Signup
                        setTokenInMemoryAndInCookie={
                            setTokenInMemoryAndInCookie
                        }
                    />
                </Route>
                <Route path="/login">
                    <Login
                        setTokenInMemoryAndInCookie={
                            setTokenInMemoryAndInCookie
                        }
                    />
                </Route>
                <Route path="/">
                    <Home titleSearch={titleSearch} priceRange={priceRange} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
