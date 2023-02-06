import { Linking } from "react-native";
import { Storage } from "./storage";
import { generateAuthPrerequisites } from "./token";

export async function startAuth(url: string) {
	// TODO: IMPLEMENT AUTH
	return "IMPLEMENT ME"
}

export async function startAuthFlow() {
	const { codeVerifier, url } = await generateAuthPrerequisites();
	await Storage.setItem('auth.code_verifier', codeVerifier);
	Linking.openURL(url);
};