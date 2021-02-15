import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const Publish = ({ baseUrl, token }) => {
    const [file, setFile] = useState({});
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState(0);
    const [interestedInExchanges, setInterestedInExchanges] = useState(false);

    let history = useHistory();

    const handleTitleChange = (event) => {
        const value = event.target.value;
        setTitle(value);
    };

    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value);
    };

    const handleBrandChange = (event) => {
        const value = event.target.value;
        setBrand(value);
    };

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    };

    const handleConditionChange = (event) => {
        const value = event.target.value;
        setCondition(value);
    };

    const handleCityChange = (event) => {
        const value = event.target.value;
        setCity(value);
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    };

    const handleInterestedInExchangesChange = (event) => {
        const value = event.target.value;
        setInterestedInExchanges(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("picture", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("color", brand);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("price", price);

        try {
            const response = await axios.post(
                baseUrl + "/offer/publish",
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-type": "multipart/form-data",
                    },
                }
            );
            //alert(JSON.stringify(response.data)); //msgjs21 mettre JSON.stringify dans aide
            console.log(response.data);
            history.push("/Offer/" + response.data._id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="publish-main">
            {token ? (
                <div className="container ">
                    <h1>Vends ton article</h1>

                    <form className="publish-form" onSubmit={handleSubmit}>
                        <section className="publish-label-and-input publish-image-section">
                            <input
                                className="publish-add-image-button"
                                type="file"
                                onChange={(event) => {
                                    setFile(event.target.files[0]);
                                }}
                            />
                        </section>

                        <section>
                            <div className="publish-label-and-input">
                                <div className="publish-input-label">Titre</div>
                                <input
                                    className="publish-input"
                                    type="text"
                                    placeholder="ex: Chemise Sézanne verte"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>

                            <div className="publish-label-and-input publish-label-and-input-description">
                                <div className="publish-input-label">
                                    Décrit ton article
                                </div>
                                <textarea
                                    className="publish-input-label publish-textarea"
                                    className="publish-input"
                                    placeholder="ex: porté quelquefois, taille correctement"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </div>
                        </section>

                        <section>
                            <div className="publish-label-and-input">
                                <div className="publish-input-label">
                                    Marque
                                </div>
                                <input
                                    className="publish-input"
                                    type="text"
                                    placeholder="ex: Zara"
                                    value={brand}
                                    onChange={handleBrandChange}
                                />
                            </div>

                            <div className="publish-label-and-input">
                                <div className="publish-input-label">
                                    Couleur
                                </div>
                                <input
                                    className="publish-input"
                                    type="text"
                                    placeholder="ex: Fusia"
                                    value={color}
                                    onChange={handleColorChange}
                                />
                            </div>

                            <div className="publish-label-and-input">
                                <div className="publish-input-label">Etat</div>
                                <input
                                    className="publish-input"
                                    type="text"
                                    placeholder="ex: Neuf avec étiquette"
                                    value={condition}
                                    onChange={handleConditionChange}
                                />
                            </div>

                            <div className="publish-label-and-input">
                                <div className="publish-input-label">Lieu</div>
                                <input
                                    className="publish-input"
                                    type="text"
                                    placeholder="ex: Montpellier"
                                    value={city}
                                    onChange={handleCityChange}
                                />
                            </div>
                        </section>

                        <section>
                            <div className="publish-label-and-input">
                                <div className="publish-input-label">Prix</div>
                                <input
                                    className="publish-input"
                                    type="text"
                                    placeholder="0.00 €"
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                            </div>

                            <div className="publish-label-and-input">
                                <input
                                    className="publish-input"
                                    type="checkbox"
                                    placeholder="ex:"
                                    value={interestedInExchanges}
                                    onChange={handleInterestedInExchangesChange}
                                />
                                <div>Je suis intéressé(e) par les échanges</div>
                            </div>
                        </section>

                        <div className="publish-around-add-offer-button">
                            <button type="Submit">Ajouter</button>
                        </div>
                    </form>
                </div>
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { fromPublish: true } }} //msgjs21 à indiquer dans aide react
                />
            )}
        </div>
    );
};

export default Publish;
