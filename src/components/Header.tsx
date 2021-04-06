import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.3dcf8b02.png";
import FilterAndSortTool from "./FilterAndSortTool";
import { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { disconnect } from "../app/connectedUserSlice";
import SaveUserIds from "../functions/SaveUserIds";

const Header = () => {
    const [withFilterAndSortTool, setWithFilterAndSortTool] = useState(false);
    const { token } = useAppSelector((state: RootState) => state.connectedUser);

    const dispatch = useAppDispatch();

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
                {withFilterAndSortTool && <FilterAndSortTool />}

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
                                dispatch(disconnect());
                                SaveUserIds("", "");
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
