import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";

const store = configureStore({      //создаем магазин
    reducer: {      //создаем хранилище
        posts: postsReducer,
        auth: authReducer,
    },
});

export default store;       //экспортируем