import { Link } from "react-router-dom";
import Logo from "../assets/logo.3dcf8b02.png";

const Header = ({ token, setTokenInMemoryAndInCookie }) => {
    return (
        <>
            <div className="header-main">
                <Link to="/">
                    <img src={Logo} alt="Vinted" className="header-logo" />
                </Link>

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
                            className="header-sign-up-login"
                            onClick={() => {
                                setTokenInMemoryAndInCookie("");
                            }}
                        >
                            Se déconnecter
                        </button>
                    )}

                    <button className="header-sell-your-products">
                        Vends tes produits
                    </button>
                </div>
            </div>
        </>
    );
};

export default Header;
