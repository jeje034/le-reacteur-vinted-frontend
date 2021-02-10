import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

const Offer = () => {
    const [isDownloading, setIsDownloading] = useState(true);
    const { id } = useParams();
    const [offer, setOffer] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get(
                //"https://le-reacteur-vinted.herokuapp.com/offer" + id
                "https://lereacteur-vinted-api.herokuapp.com/offer/" + id
            );
            console.log("rp :", response.data);
            setOffer(response.data);
            setIsDownloading(false);
        } catch (error) {
            console.log("An error occured : ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    //450 * 600
    return isDownloading ? (
        <div>Chargement en cours ...</div>
    ) : (
        <div>
            <Header />
            {"Page Offer, id : " + id}
            <br />
            <div>
                {offer.product_pictures.map((elem, index) => {
                    return (
                        <div key={index}>
                            <img
                                src={elem.secure_url}
                                alt={elem.product_name}
                            />
                        </div>
                    );
                })}
            </div>
            <div>{offer.product_name}</div>

            <Link to="/">Home</Link>
        </div>
    );
};

export default Offer;
