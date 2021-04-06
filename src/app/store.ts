import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import connectedUserReducer from "./connectedUserSlice";
// import counterJsiReducer from "../components/CounterJsi/counterJsiSlice";
// import quoteReducer from "../components/Quote/quoteSlice";

export const store = configureStore({
    reducer: {
        connectedUser: connectedUserReducer,
        //     counterJsi: counterJsiReducer,
        //     quote: quoteReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
