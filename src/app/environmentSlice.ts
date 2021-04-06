import { createSlice } from "@reduxjs/toolkit";

interface EnvironmentState {
    baseUrl: string;
}

const initialState: EnvironmentState = {
    baseUrl: "",
};

const environmentSlice = createSlice({
    name: "environment",
    initialState: initialState,
    reducers: {
        setBaseUrl(state, action) {
            state.baseUrl = action.payload;
        },
    },
});

export default environmentSlice.reducer;

//Actions
export const { setBaseUrl } = environmentSlice.actions;
