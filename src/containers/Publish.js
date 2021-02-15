import { Redirect } from "react-router-dom";

const Publish = ({ baseUrl, token }) => {
    console.log("tdp", token);

    return (
        <>
            {token ? (
                <div>publish</div>
            ) : (
                <div>
                    <Redirect to="/login" />
                </div>
            )}
        </>
    );
};

export default Publish;
