const NavigationBar = ({
    page,
    setPage,
    limit,
    numberOfOffers,
}: {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    limit: number;
    numberOfOffers: number;
}) => {
    const changePage = (numberOfPageToAdd: number) => {
        let newPage = page + numberOfPageToAdd;
        if (newPage < 1) {
            newPage = 1;
        }

        if (newPage - 1 > numberOfOffers / limit) {
            setPage(Math.ceil(numberOfOffers / limit));
        } else {
            setPage(newPage);
        }
    };

    return (
        <div className="navigation-bar-main container">
            <button
                className="navigation-bar-left-button navigation-bar-button"
                data-testid="navigation-bar-previous-page-button"
                onClick={() => {
                    changePage(-1);
                }}
            >
                Page précédente
            </button>
            <button
                className="navigation-bar-right-button navigation-bar-button"
                data-testid="navigation-bar-next-page-button"
                onClick={() => {
                    changePage(1);
                }}
            >
                Page suivante
            </button>
        </div>
    );
};

export default NavigationBar;
