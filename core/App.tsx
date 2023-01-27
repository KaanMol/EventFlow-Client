import React from 'react';
import { Index } from './pages/Index';
import { Login } from './pages/Login';

const App = () => {
	const loggedIn = false;

	return loggedIn ? <Index /> : <Login />
};

export default App;