import { atom, selector } from "recoil";

const accessTokenAtom = atom({
	key: 'accessTokenAtom',
	default: selector({
		key: 'accessTokenInit',
		get: async () => {
			let data = await request.get("/users/63a34fb4fc5260fc608087a9");
			return data.data.data.sources;
		},
	}),
});