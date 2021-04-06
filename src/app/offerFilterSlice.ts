import { createSlice } from "@reduxjs/toolkit";
import * as Constants from "../constants/constants";

interface OfferFilterState {
    titleSearch: string;
    priceRange: number[];
}

const initialState: OfferFilterState = {
    titleSearch: "",
    priceRange: [Constants.MIN_PRICE_IN_FILTER, Constants.MAX_PRICE_IN_FILTER],
};

const offerFilterSlice = createSlice({
    name: "offerFilter",
    initialState: initialState,
    reducers: {
        setTitleSearch(state, action) {
            state.titleSearch = action.payload;
        },
        setPriceRange(state, action) {
            state.priceRange = action.payload;
        },
    },
});

export default offerFilterSlice.reducer;

//Actions
export const { setTitleSearch, setPriceRange } = offerFilterSlice.actions;
