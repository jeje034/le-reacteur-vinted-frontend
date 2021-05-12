const GetBackendBaseUrl = (): string => {
    const extendedWindow = window as any;

    //Quand on fait un simple yarn build hors Docker (en développement) xtendedWindow._env_ est falsy
    if (!extendedWindow._env_) {
        //console.log("extendedWindow._env_:", "falsy");
        return "https://le-reacteur-vinted.herokuapp.com"; //Site distant Jérôme hors conteneur.
        // return "https://lereacteur-vinted-api.herokuapp.com" //Site distant Le Reacteur.
        // return "http://localhost:3001" //Site développement Jérôme hors conteneur.
    }

    // console.log(
    //     "GetBackendBaseUrl : VINTED_BACKEND_URL :",
    //     extendedWindow._env_.VINTED_BACKEND_URL
    // );
    // console.log(
    //     "GetBackendBaseUrl : TEST_VARIABLE :",
    //     extendedWindow._env_.TEST_VARIABLE
    // );

    //Cas prévu pour Docker : VINTED_BACKEND_URL provient des variables d'environnement ou du fichier .env
    return extendedWindow._env_.VINTED_BACKEND_URL;
};
export default GetBackendBaseUrl;
