import axios from "axios";
import { atom, selector } from "recoil";
import { request } from "../common/request";

const sourceAtom = atom({
    key: 'source',
    default: selector({
        key: 'sourceLoader',
        get: async () => {
            let data = await request.get("/users/63a34fb4fc5260fc608087a9");
            return data.data.data.sources;
        },
    }),
});

export const sourceSelector = selector({
    key: 'sourceSelector',
    get: async ({ get }) => {
        const source = get(sourceAtom);

        return source;
    },
    set: ({ set }, newValue) => {
        console.log(newValue)
        set(sourceAtom, newValue);
    }
});