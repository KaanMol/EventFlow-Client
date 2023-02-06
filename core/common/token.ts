import axios from "axios";
import Hashes from "jshashes";
import randomString from "random-string";
import auth from "../config/auth";
import { Storage } from "./storage";

export async function fetchAccessToken(code: string) {
	const codeVerifier = await Storage.getItem('auth.code_verifier');

	if (codeVerifier === null) {
		// TODO: Implement error
		return;
	}

	const params = new URLSearchParams();
	params.append('grant_type', 'authorization_code');
	params.append('client_id', auth.clientId);
	params.append('code_verifier', codeVerifier);
	params.append('code', code);
	params.append('redirect_uri', auth.redirectUrl);

	const res = await axios.post(
		auth.tokenEndpoint,
		params.toString()
	);

	await Storage.setItem('auth.access_token', res.data.access_token);
	await Storage.setItem('auth.refresh_token', res.data.refresh_token);

	return res.data.access_token;
}

export async function generateAuthPrerequisites() {
	const codeVerifier = randomString({ length: 40 });
	const codeChallenge = new Hashes.SHA256()
		.b64(codeVerifier)
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+/g, '');

	const authState = randomString({ length: 30 });

	const url = `${auth.authorizationEndpoint}?client_id=${auth.clientId
		}&redirect_uri=${auth.redirectUrl}&response_type=code&scope=${auth.scopes.join(
			' ',
		)}&state=${authState}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
	console.log(url)
	await Storage.setItem('auth.code_verifier', codeVerifier);

	return {
		codeVerifier,
		authState,
		url
	}
}