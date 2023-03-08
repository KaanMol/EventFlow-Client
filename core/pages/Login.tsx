
import { ActivityIndicator, Button, Text, View, Linking } from 'react-native';
import { FullPageLayout } from '../layout/page/FullPage';
import { useCallback, useEffect, useState } from 'react';
import { startAuthFlow } from '../common/auth';
import { useAppDispatch } from '../store';
import { asyncFetchAccessToken } from '../store/auth/authSlice';

export function Auth({ route, navigation }) {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const code = route.params.code;
		if (code !== null) {
			dispatch(asyncFetchAccessToken(code))
		}
	}, [dispatch])

	return (
		<View style={{ flex: 1 }}>
			<Text style={{ fontSize: 24 }}>
				Logging you in, hang on there!
			</Text>
			<ActivityIndicator size="large" />
		</View>
	);
}

export function Login({ navigation }) {
	const login = useCallback(async () => {
		await startAuthFlow(navigation, Linking)
	}, [navigation])

	return (
		<FullPageLayout>
			<View style={{ alignItems: 'center' }}>
				<Text style={{ fontSize: 24 }}>
					Are you ready to plan your next adventure?
				</Text>
				<Button title="Login" onPress={login} />
			</View>
		</FullPageLayout>
	);
}
