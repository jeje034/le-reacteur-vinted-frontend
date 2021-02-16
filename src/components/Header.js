import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.3dcf8b02.png";
import FilterAndSortTool from "./FilterAndSortTool";
import { useState, useEffect } from "react";

const Header = ({
    token,
    setuserInformationsInMemoryAndInCookie,
    titleSearch,
    setTitleSearch,
    priceRange,
    setPriceRange,
}) => {
    const [withFilterAndSortTool, setWithFilterAndSortTool] = useState(false);

    function usePageViews() {
        let location = useLocation();
        useEffect(() => {
            if (location.pathname === "/") {
                setWithFilterAndSortTool(true);
            } else {
                setWithFilterAndSortTool(false);
            }
        }, [location]);
    }

    usePageViews();

    return (
        <>
            <div
                className={
                    withFilterAndSortTool
                        ? "header-main header-max-size"
                        : "header-main"
                }
            >
                <Link to="/">
                    <img src={Logo} alt="Vinted" className="header-logo" />
                </Link>
                {withFilterAndSortTool && (
                    <FilterAndSortTool
                        titleSearch={titleSearch}
                        setTitleSearch={setTitleSearch}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                    />
                )}

                <div className="header-button-group">
                    {!token && (
                        <Link to="/signup">
                            <button className="header-sign-up-login">
                                S'inscrire
                            </button>
                        </Link>
                    )}

                    {!token && (
                        <Link to="/login">
                            <button className="header-sign-up-login">
                                Se connecter
                            </button>
                        </Link>
                    )}

                    {token && (
                        <button
                            className="header-sign-up-login header-log-out"
                            onClick={() => {
                                setuserInformationsInMemoryAndInCookie("", "");
                            }}
                        >
                            Se déconnecter
                        </button>
                    )}

                    <Link to="/publish">
                        <button className="header-sell-your-products">
                            Vends tes produits
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Header;
