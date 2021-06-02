import "./FilterAndSortTool.scss";
import { Range } from "react-range";
import * as Constants from "../constants/constants";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPriceRange, setTitleSearch } from "../app/offerFilterSlice";
import { RootState } from "../app/store";

const FilterAndSortTool = () => {
    const { priceRange, titleSearch } = useAppSelector(
        (state: RootState) => state.offerFilter
    );

    const dispatch = useAppDispatch();

    const handleTitleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        dispatch(setTitleSearch(value));
    };

    return (
        <div className="filter-and-sort-tool-main">
            <div className="filter-and-sort-tool-search-group">
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="filter-and-sort-tool-search-icon"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                </svg>
                <input
                    data-testid="filter-and-sort-tool-title-search"
                    type="text"
                    className="filter-and-sort-tool-title-search"
                    placeholder="Rechercher des articles"
                    value={titleSearch}
                    onChange={handleTitleSearchChange}
                ></input>
            </div>
            <div className="filter-and-sort-tool-bottom-group">
                <div className="filter-and-sort-tool-price-range-text">{`Prix entre ${priceRange[0]} et ${priceRange[1]} € :`}</div>

                {/* Cette Balise Range provient du package react-range de Vojtech Miksu : https://www.npmjs.com/package/react-range.*/}
                <Range
                    step={5}
                    min={Constants.MIN_PRICE_IN_FILTER}
                    max={Constants.MAX_PRICE_IN_FILTER}
                    values={priceRange}
                    onChange={(priceRange) =>
                        dispatch(setPriceRange(priceRange))
                    }
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "5px",
                                width: "100%",
                                background: "rgb(44, 177, 186)",
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: "15px",
                                width: "15px",
                                color: "white",
                                fontSize: "12px",
                                fontFamily: "Maison Neue",
                                padding: "4px",
                                backgroundColor: "rgb(44, 177, 186)",
                                borderRadius: "50%",
                                border: "1px solid white",
                                outline: "none",
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default FilterAndSortTool;
