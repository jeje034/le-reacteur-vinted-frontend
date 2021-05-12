import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as Constants from "../constants/constants";
import GetBackendBaseUrl from "../functions/GetBackendBaseUrl";

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

export const tryToLog = createAsyncThunk(
    "tryToLog",
    async (arg: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                GetBackendBaseUrl() + "/user/login",
                {
                    email: arg.email,
                    password: arg.password,
                }
            );
            return response.data;
        } catch (err) {
            let errorMessage: string;

            //L'erreur Unauthorized est générée explicitement dans le code de l'API vinted
            if (err?.response?.data?.error?.message === "Unauthorized") {
                errorMessage = "Email ou mot de passe incorrect.";
            }
            //On tombe dans le else par exemple lorsque le serveur est tombé.
            else {
                errorMessage =
                    "Une erreur est survenue lors de la tentative de connexion.";
            }
            return rejectWithValue(errorMessage);
        }
    }
);

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
        disconnect(state) {
            state.token = "";
            state.id = "";
            state.isLoading = false;
            state.loginError = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(tryToLog.pending, (state, action) => {
                state.token = null;
                state.id = "";
                state.isLoading = true;
                state.loginError = "";
            })
            .addCase(tryToLog.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.id = action.payload._id;
                state.isLoading = false;
                state.loginError = "";
            })
            .addCase(tryToLog.rejected, (state, action) => {
                state.token = null;
                state.id = "";
                state.isLoading = false;
                state.loginError = action.payload as string;
            });
    },
});

export default connectedUserSlice.reducer;

//Actions
export const { setUserIds, disconnect } = connectedUserSlice.actions;
