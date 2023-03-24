import React from 'react';
import { Text } from 'react-native';
import { Index } from './pages/Index';
import { Auth, Login } from './pages/Login';
import { Provider } from 'react-redux';
import store, { useAppDispatch, useAppSelector } from './store';
import { initAuth, logout } from './store/auth/authSlice';
import { Settings } from './pages/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './common/router';

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
			</>
		) : (
			<>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Auth" component={Auth} />
			</>
		)}
	</Stack.Navigator>;
}

const Stack = createNativeStackNavigator();

const config = {
	screens: {
		Dashboard: "dashboard",
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
