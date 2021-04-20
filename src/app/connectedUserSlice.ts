import { createSlice } from "@reduxjs/toolkit";

interface ConnectedUserState {
    token: string | null;
    id: string;
    isLoading: boolean;
    loginError: string;
}

const initialState: ConnectedUserState = {
    token: null,
    id: "",
    isLoading: false,
    loginError: "",
};

const connectedUserSlice = createSlice({
    name: "connectedUser",
    initialState: initialState,
    reducers: {
        setUserIds(state, action) {
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.isLoading = false;
            state.loginError = "";
        },
        loginRequest(state) {
            state.token = null;
            state.id = "";
            state.isLoading = false;
            state.loginError = "";
        },
        loginSucces(state, action) {
            state.token = action.payload.token;
            state.id = action.payload._id;
            state.isLoading = false;
            state.loginError = "";
        },
        loginFail(state, action) {
            state.token = null;
            state.id = "";
            state.isLoading = false;
            state.loginError = action.payload
                ? action.payload
                : "Une erreur est survenue lors de la connexion.";
        },
        disconnect(state) {
            state.token = "";
            state.id = "";
            state.isLoading = false;
            state.loginError = "";
        },
    },
});

export default connectedUserSlice.reducer;

//Actions
export const {
    setUserIds,
    loginRequest,
    loginSucces,
    loginFail,
    disconnect,
} = connectedUserSlice.actions;
