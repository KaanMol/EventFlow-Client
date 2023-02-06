
import { ActivityIndicator, Button, Platform, Text, View } from 'react-native';
import { FullPageLayout } from '../layout/page/FullPage';
import { useEffect, useState } from 'react';
import { startAuthFlow } from '../common/auth';
import { useSearchParams } from '../Router';
import { fetchAccessToken } from '../common/token';

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

	useEffect(() => {
		if (Platform.OS === "web") {
			const code = searchParams.get("code");
			if (code !== null) {
				setLoggingIn(true)
				fetchAccessToken(code).then(accessToken => {
					props.setLogin(accessToken)
				}).catch(console.error);
			}
		}
	}, [])


	return (
		<FullPageLayout>
			<View style={{ alignItems: 'center' }}>
				{loggingIn === true ?
					<LoggingIn /> :
					<>
						<Text style={{ fontSize: 24 }}>
							Are you ready to plan your next adventure?
						</Text>
						<Button title="Login" onPress={async () => {
							setLoggingIn(true);
							props.setLogin(await startAuthFlow())
						}} />
					</>
				}
			</View>
		</FullPageLayout>
	);
}
