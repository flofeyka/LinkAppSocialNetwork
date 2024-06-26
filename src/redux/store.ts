import dialogsSlice from "./dialogsSlice";
import profileSlice from "./profileSlice";
import friendsSlice from "./friendsSlice";
import feedSlice from "./feedSlice";
import authSlice from "./authSlice";
import communitySlice from "./communitySlice";
import appSlice from "./appSlice";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import postsSlice from "./postsSlice";

const store = configureStore({
    reducer: {
        Messanger: dialogsSlice,
        Profile: profileSlice,
        Feed: feedSlice,
        Friends: friendsSlice,
        Auth: authSlice,
        Community: communitySlice,
        App: appSlice,
        Posts: postsSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;


export default store;