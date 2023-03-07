import React, { useEffect } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Route, Router, Routes } from './common/router';
import { Provider } from 'react-redux';
import store, { useAppDispatch, useAppSelector } from './store';
import { asyncFetchAccessToken, initAuth, logout } from './store/auth/authSlice';
import { Navigation } from './components/Navigation';
import { Settings } from './pages/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';

function Calendar() {
	const auth = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();

	return <Stack.Navigator>
		{auth.loggedIn ? (
			<>
				<Stack.Screen name="Settings">
					{(props) => <Settings
						logout={() => dispatch(logout())}
					/>}
				</Stack.Screen>
				<Stack.Screen name="Dashboard" component={Index} />

				{/* <Routes>
						<Route path='/' element={<Index />} />
						<Route path='/settings' element={<Settings
							logout={() => dispatch(logout())}
						/>} />
					</Routes> */}
				{/* <Navigation /> */}
			</>
		) : (
			<>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Auth" component={Auth} />
			</>
		)}
	</Stack.Navigator>;
}

function Auth({ route, navigation }) {
	console.log(route.params);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const code = route.params.code;
		if (code !== null) {
			// setAuthFlowState(true)
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

const Stack = createNativeStackNavigator();
const config = {
	screens: {
		Home: "home",
		Details: "details",
		Auth: "auth",
		Login: "login"
	},
};

const linking = {
	prefixes: [
		"my-demo://",
		"http://localhost:8080/*"
	],
	config
};

const App = () => {
	store.dispatch(initAuth());

	return (
		<Provider store={store}>
			<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
				<Calendar />
			</NavigationContainer>
		</Provider>
	);
};

export default App;
