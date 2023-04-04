import React from 'react';
import { Button, Text, View } from 'react-native';
import { Index } from './pages/Index';
import { Auth, Login } from './pages/Login';
import { Provider } from 'react-redux';
import store, { useAppDispatch, useAppSelector } from './store';
import { initAuth, logout } from './store/auth/authSlice';
import { Settings } from './pages/Settings';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './common/router';
import { CalendarView } from './pages/Calendar';
import {
	GestureHandlerRootView,
	RectButton,
	State,
	TapGestureHandler,
} from 'react-native-gesture-handler';
import Modal from "react-native-modal";

function ModalScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontSize: 30 }}>This is a modal!</Text>
			<Button onPress={() => navigation.goBack()} title="Dismiss" />

		</View>
	);
}

function HomeScreen({ navigation }) {
	const [isModalVisible, setModalVisible] = React.useState(false);
	return (

		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ fontSize: 30 }}>This is the home screen!</Text>
			<Button
				onPress={() => setModalVisible(true)}
				title="Open Modal"
			/>

			<TapGestureHandler
				numberOfTaps={2}
				maxDurationMs={500}
				maxDelayMs={500}
				maxDist={10}
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.ACTIVE) {
						console.log('Tap!');
					}
				}}>
				<Modal isVisible={isModalVisible}>
					<View style={{ backgroundColor: 'white' }}>
						<Text>I am the modal content!</Text>
						<Button
							onPress={() => setModalVisible(false)}
							title="Open Modal"
						/>
					</View>
				</Modal>
			</TapGestureHandler>
		</View>
	);
}

function Calendar() {
	const auth = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();

	return <Stack.Navigator>
		{auth.loggedIn ? (
			<>
				<Stack.Screen name="Calendar" component={CalendarView} />
				<Stack.Screen name="Settings">
					{(props) => <Settings
						logout={() => dispatch(logout())}
					/>}
				</Stack.Screen>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Group screenOptions={{ presentation: 'modal' }}>
					<Stack.Screen name="MyModal" component={ModalScreen} />
				</Stack.Group>
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
		Calendar: "calendar",
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
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
					<Calendar />
				</NavigationContainer>
			</GestureHandlerRootView>
		</Provider>
	);
};

export default App;
