import { useParams, Link } from "react-router-dom";

const Offer = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            {" "}
            {"Page Offer, id : " + id}
            <br />
            <Link to="/">Home</Link>
        </div>
    );
};

export default Offer;
