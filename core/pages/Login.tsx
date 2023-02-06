
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { FullPageLayout } from '../layout/page/FullPage';
import { useEffect, useState } from 'react';
import { startAuthFlow } from '../common/auth';
import { useSearchParams, useNavigate } from '../common/router';
import { useAppDispatch } from '../store';
import { asyncFetchAccessToken } from '../store/auth/authSlice';

function LoggingIn() {
	return <>
		<Text style={{ fontSize: 24 }}>
			Logging you in, hang on there!
		</Text>
		<ActivityIndicator size="large" />
	</>

}

export function Login() {
	const [authFlowState, setAuthFlowState] = useState(false);
	let [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const code = searchParams.get("code");
		if (code !== null) {
			setAuthFlowState(true)
			dispatch(asyncFetchAccessToken(code)).then(() => {
				navigate("/");
			})
		}
	}, [searchParams, dispatch, navigate])


	return (
		<FullPageLayout>
			<View style={{ alignItems: 'center' }}>
				{authFlowState ?
					<LoggingIn /> :
					<>
						<Text style={{ fontSize: 24 }}>
							Are you ready to plan your next adventure?
						</Text>
						<Button title="Login" onPress={async () => {
							setAuthFlowState(true)
							await startAuthFlow(navigate)
						}} />
					</>
				}
			</View>
		</FullPageLayout>
	);
}
