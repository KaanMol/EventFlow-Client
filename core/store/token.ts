import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import { atom, selector } from "recoil";
import { request } from "../common/request";

const tokenAtom = atom({
    key: 'token',
    default: selector({
        key: 'sourceLoader',
        get: async () => {
            return await EncryptedStorage.getItem('access_token');
        }
    }),
});

export const tokenState = selector({
    key: 'tokenState',
    get: ({ get }) => {
        const token = get(tokenAtom);
        if (token === null) { return null; } else { return token; }
    },
    set: ({ set }, newValue) => {
        EncryptedStorage.setItem('access_token', newValue === null ? '' : newValue.toString());
        return set(tokenAtom, newValue);
    }
});