import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import Hashes from 'jshashes';
import randomString from 'random-string';
import { ActivityIndicator, Alert, Button, Linking, Text, View } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import authConfig from '../config/auth';
import { FullPageLayout } from '../layout/page/FullPage';
import { useState } from 'react';

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

			if (await InAppBrowser.isAvailable()) {
				const result = await InAppBrowser.openAuth(url, 'my-demo://demo/', {
					// iOS Properties
					dismissButtonStyle: 'cancel',
					preferredBarTintColor: '#453AA4',
					preferredControlTintColor: 'white',
					readerMode: false,
					animated: true,
					modalPresentationStyle: 'fullScreen',
					modalTransitionStyle: 'coverVertical',
					modalEnabled: true,
					enableBarCollapsing: false,
					ephemeralWebSession: false,
					// Android Properties
					showTitle: true,
					toolbarColor: '#6200EE',
					secondaryToolbarColor: 'black',
					navigationBarColor: 'black',
					navigationBarDividerColor: 'white',
					enableUrlBarHiding: true,
					enableDefaultShare: true,
					forceCloseOnRedirection: false,
					// Specify full animation resource identifier(package:anim/name)
					// or only resource name(in case of animation bundled with app).
					animations: {
						startEnter: 'slide_in_right',
						startExit: 'slide_out_left',
						endEnter: 'slide_in_left',
						endExit: 'slide_out_right',
					},
				});

				setLoggingIn(true);

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
				await EncryptedStorage.setItem('access_token', res.data.access_token);
				props.setLogin(res.data.access_token);
				await EncryptedStorage.setItem('refresh_token', res.data.refresh_token);
			} else {
				Linking.openURL(url);
			}
		} catch (error) {
			console.log(JSON.stringify(error));
			Alert.alert(error);
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
						<Button title="Login" onPress={test} />
					</>
				}
			</View>
		</FullPageLayout>
	);
}
