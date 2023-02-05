import React from 'react';
import { Text } from 'react-native';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { Route, Router, Routes } from './Router';
import { tokenState } from './store/token';

function Calendar() {
	const [token, setToken] = useRecoilState(tokenState);

	//TODO: Currently when you are logged in, the app takes a while before showing the logged in state
	return (
		<>
			{(token as string)?.length ? (
				<>

					<Index
						logout={() => {
							setToken('');
						}}
					/>
				</>
			) : (
				<>
					<Router>
						<Routes>
							<Route path='/' element={<Login
								setLogin={_token => {
									setToken(_token);
								}}
							/>} />
						</Routes>
					</Router>
				</>
			)}
		</>
	);
}

const App = () => {
	return (
		<RecoilRoot>
			<React.Suspense fallback={<Text>Loading...</Text>}>
				<Calendar />
			</React.Suspense>
		</RecoilRoot>
	);
};

export default App;
