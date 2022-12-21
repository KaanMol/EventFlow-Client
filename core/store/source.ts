import axios from "axios";
import { atom, selector } from "recoil";

const sourceAtom = atom({
    key: 'source',
    default: selector({
        key: 'sourceLoader',
        get: async () => {
            let data = await fetch("http://localhost:3000/users/63a34fb4fc5260fc608087a9");
            return (await data.json()).data.sources;
            return await (await axios.get("http://localhost:3000/users/63a34fb4fc5260fc608087a9")).data.data.sources;
        },
    }),
});

export const sourceSelector = selector({
    key: 'sourceSelector',
    get: async ({ get }) => {
        const source = get(sourceAtom);

        return source;
    }
});