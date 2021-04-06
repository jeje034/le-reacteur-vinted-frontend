import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import connectedUserReducer from "./connectedUserSlice";
import offerFilterReducer from "./offerFilterSlice";
import environmentReducer from "./environmentSlice";

export const store = configureStore({
    reducer: {
        connectedUser: connectedUserReducer,
        offerFilter: offerFilterReducer,
        environment: environmentReducer,
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
