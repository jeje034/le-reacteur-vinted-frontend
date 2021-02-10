import Logo from "../assets/logo.3dcf8b02.png";

const Header = () => {
    return (
        <div>
            <img src={Logo} alt="Vinted" className="header-logo" />
            <button>Sign up</button>
            <button>Login</button>
        </div>
    );
};

export default Header;
