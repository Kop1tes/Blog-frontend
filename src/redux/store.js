import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";

const store = configureStore({      //создаем магазин
    reducer: {      //создаем хранилище
        posts: postsReducer,
    },
});

export default store;       //экспортируем