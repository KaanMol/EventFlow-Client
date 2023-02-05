
import axios from 'axios';
import Hashes from 'jshashes';
import randomString from 'random-string';
import { ActivityIndicator, Alert, Button, Linking, Platform, Text, View } from 'react-native';

import authConfig from '../config/auth';
import { FullPageLayout } from '../layout/page/FullPage';
import { useCallback, useEffect, useState } from 'react';
import { Storage } from "../common/storage.web";
import { startAuth } from '../common/auth';
import { useSearchParams } from '../Router';
import { redirect } from 'react-router-dom';

function LoggingIn() {
	return <>
		<Text style={{ fontSize: 24 }}>
			Logging you in, hang on there!
		</Text>
		<ActivityIndicator size="large" />
	</>

}

export function Login(props: { setLogin: (token: string) => void }) {
	const [loggingIn, setLoggingIn] = useState(false);
	let [searchParams, setSearchParams] = useSearchParams();

	const fetchToken = useCallback(async () => {
		const result = setLoggingIn(true);

		const params = new URLSearchParams();
		params.append('grant_type', 'authorization_code');
		params.append('client_id', authConfig.clientId);
		params.append('code_verifier', await Storage.getItem('verifier') as string);
		params.append('code', searchParams.get("code") as string);
		params.append('redirect_uri', 'http://localhost:8080/');

		const res = await axios.post(
			authConfig.tokenEndpoint,
			params.toString()
		);

		await Storage.setItem('access_token', res.data.access_token);
		props.setLogin(res.data.access_token);
		await Storage.setItem('refresh_token', res.data.refresh_token);
	}, [])

	useEffect(() => {
		if (Platform.OS === "web") {
			console.log(12121)
			const code = searchParams.get("code");
			if (code !== null) {
				console.log(122323121)
				fetchToken().catch(console.error)
			}
		}
	}, [fetchToken])

	const web = async () => {
		try {
			console.log(1)
			const codeVerifier = randomString({ length: 40 });
			const codeChallenge = new Hashes.SHA256()
				.b64(codeVerifier)
				.replace(/\+/g, '-')
				.replace(/\//g, '_')
				.replace(/=+/g, '');

			const authState = randomString({ length: 30 });
			const url = `${authConfig.authorizationEndpoint}?client_id=${authConfig.clientId
				}&redirect_uri=${authConfig.redirectUrl
				}&response_type=code&scope=${authConfig.scopes.join(
					' ',
				)}&state=${authState}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

			await Storage.setItem('verifier', codeVerifier);
			(window as any).location.href = url
		} catch (e) {
			console.log(JSON.stringify(e));
			// Alert.alert(error as any);
			setLoggingIn(false);
		}
	};

	const test = async () => {
		try {
			const codeVerifier = randomString({ length: 40 });
			const codeChallenge = new Hashes.SHA256()
				.b64(codeVerifier)
				.replace(/\+/g, '-')
				.replace(/\//g, '_')
				.replace(/=+/g, '');

			const authState = randomString({ length: 30 });
			const url = `${authConfig.authorizationEndpoint}?client_id=${authConfig.clientId
				}&redirect_uri=${authConfig.redirectUrl
				}&response_type=code&scope=${authConfig.scopes.join(
					' ',
				)}&state=${authState}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

			await startAuth(url)
			const result = setLoggingIn(true);

			const code = (result as any).url.substring(21, 53);
			const params = new URLSearchParams();
			params.append('grant_type', 'authorization_code');
			params.append('client_id', authConfig.clientId);
			params.append('code_verifier', codeVerifier);
			params.append('code', code);
			params.append('redirect_uri', 'my-demo://demo/');

			const res = await axios.post(
				authConfig.tokenEndpoint,
				params.toString(),
			);

			await Storage.setItem('access_token', res.data.access_token);
			props.setLogin(res.data.access_token);
			await Storage.setItem('refresh_token', res.data.refresh_token);

		} catch (error) {
			console.log(JSON.stringify(error));
			// Alert.alert(error as any);
			setLoggingIn(false);
		}
	};

	return (
		<FullPageLayout>
			<View style={{ alignItems: 'center' }}>
				{loggingIn === true ?
					<LoggingIn /> :
					<>
						<Text style={{ fontSize: 24 }}>
							Are you ready to plan your next adventure?
						</Text>
						<Button title="Login" onPress={web} />
					</>
				}
			</View>
		</FullPageLayout>
	);
}
