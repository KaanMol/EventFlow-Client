import { Storage } from "./storage";
import { generateAuthPrerequisites } from "./token";

export async function startAuthFlow() {
	const { codeVerifier, url } = await generateAuthPrerequisites();
	await Storage.setItem('auth.code_verifier', codeVerifier);

	// FIX ME: Find an alternative of redirecting the user for the auth flow
	(window as any).location.href = url;
};