import { useState, SyntheticEvent } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import * as Constants from "../../constants/constants";

interface iFileWithPreview extends File {
    preview: string;
}

const Publish = () => {
    const [file, setFile] = useState<File | null>(null);
    const [files, setFiles] = useState<iFileWithPreview[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [color, setColor] = useState("");
    const [condition, setCondition] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState("");
    const [interestedInExchanges, setInterestedInExchanges] = useState(false);

    const { token } = useAppSelector((state: RootState) => state.connectedUser);

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
        setFile(acceptedFiles[0]);

        setFiles(
            acceptedFiles.map((file: File) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        //maxFiles: 1, A ajouter si on veut 1 seule image comme c'est prévu par le composant. Le problème est que si l'on glisse plus d'une image, alors aucune n'est séletionnée.
        //=> je fais autrement, je sélectionne moi même la 1ere image.
    });

    let history = useHistory();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(event.target.value);
    };

    const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(event.target.value);
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const handleConditionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setCondition(event.target.value);
    };

    const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    };

    const handleInterestedInExchangesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        //console.log("interestedInExchanges  : ", !interestedInExchanges);
        setInterestedInExchanges(!interestedInExchanges);
    };

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (isNaN(Number(price))) {
            alert("Le prix saisi est incorrect.");
            return;
        }

        const formData = new FormData();
        let notNullFile: File | null = file;
        if (notNullFile !== null) {
            formData.append("picture", notNullFile);
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("color", brand);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("price", Number(price).toString()); //ainsi un prix vide devient un prix à 0. Sans ça l serveur nous renvoie un prix null qui fait planter.

        try {
            const response = await axios.post(
                Constants.BASE_URL + "/offer/publish",
                formData,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-type": "multipart/form-data",
                    },
                }
            );
            //console.log(response.data);
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
                            <div className="publish-preview-zone">
                                {files && files.length >= 1 && (
                                    <img
                                        src={files[0].preview}
                                        alt="Article"
                                        className="publish-img"
                                    />
                                )}
                            </div>

                            <div
                                {...getRootProps()}
                                className="publish-drag-and-drop-zone"
                            >
                                <input {...getInputProps()} />
                                {isDragActive ? (
                                    <div className="publish-input-for-image publish-input-for-active-image">
                                        Ajoute une photo
                                    </div>
                                ) : (
                                    <div className="publish-input-for-image">
                                        <div>
                                            Clique ou glisse et dépose pour
                                            ajouter une photo
                                        </div>
                                    </div>
                                )}
                            </div>
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
                                    data-testid="publish-title"
                                />
                            </div>

                            <div className="publish-label-and-input publish-label-and-input-description">
                                <div className="publish-input-label">
                                    Décrit ton article
                                </div>
                                <textarea
                                    className="publish-input publish-textarea"
                                    placeholder="ex: porté quelquefois, taille correctement"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    data-testid="publish-description"
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
                                    data-testid="publish-brand"
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
                                    data-testid="publish-color"
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
                                    onChange={handlePriceChange}
                                />
                            </div>

                            <div className="publish-label-and-input">
                                <div className="publish-next-to-checkbox"></div>
                                <div className="publish-checkbox-and-label">
                                    <input
                                        className="publish-checkbox"
                                        type="checkbox"
                                        placeholder="ex:"
                                        value={interestedInExchanges.toString()}
                                        onChange={
                                            handleInterestedInExchangesChange
                                        }
                                    />
                                    <div>
                                        Je suis intéressé(e) par les échanges
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="publish-around-add-offer-button">
                            <button type="submit">Ajouter</button>
                        </div>
                    </form>
                </div>
            ) : (
                <Redirect
                    to={{ pathname: "/login", state: { fromPublish: true } }}
                />
            )}
        </div>
    );
};

export default Publish;
