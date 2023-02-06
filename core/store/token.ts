import axios from "axios";
import { atom, selector } from "recoil";
import { Storage } from "../common/storage.web";

const tokenAtom = atom({
	key: 'token',
	default: selector({
		key: 'sourceLoader',
		get: async () => {
			return await Storage.getItem('auth.access_token');
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
		Storage.setItem('auth.access_token', newValue === null ? '' : newValue.toString());
		return set(tokenAtom, newValue);
	}
});