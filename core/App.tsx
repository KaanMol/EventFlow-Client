import React from 'react';
import { Text } from 'react-native';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Route, Router, Routes } from './common/router';
import { Provider } from 'react-redux';
import store, { initAuth, logout, useAppDispatch, useAppSelector } from './store';

function Calendar() {
	const auth = useAppSelector(state => state.auth);
	const dispatch = useAppDispatch();

	return (
		<>
			{auth.loggedIn ? (
				<>
					<Routes>
						<Route path='/' element={<Index
							logout={() => dispatch(logout())}
						/>} />
					</Routes>
				</>
			) : (
				<>
					<Routes>
						<Route path='/' element={<Login />} />
					</Routes>
				</>
			)}
		</>
	);
}

const App = () => {
	store.dispatch(initAuth());

	return (
		<Provider store={store}>
			<Router>
				<React.Suspense fallback={<Text>Loading...</Text>}>
					<Calendar />
				</React.Suspense>
			</Router>
		</Provider>
	);
};

export default App;
