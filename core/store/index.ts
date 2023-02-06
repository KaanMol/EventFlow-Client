import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Storage } from '../common/storage';
import { fetchAccessToken } from '../common/token';

export const asyncFetchAccessToken = createAsyncThunk("/auth/token", fetchAccessToken)

export const initAuth = createAsyncThunk("/auth/init", async () => {
	const token = await Storage.getItem('auth.access_token');
	return token;
})

const authSlice = createSlice({
	name: "auth",
	initialState: {
		loggedIn: false,
		accessToken: ""
	},
	reducers: {
		logout: (state) => {
			Storage.removeItem('auth.access_token');
			state.accessToken = "";
			state.loggedIn = false;
		}
	},
	extraReducers(builder) {
		builder.addCase(initAuth.fulfilled, (state, action) => {
			const token = action.payload;
			if (token === null) {
				state.loggedIn = false;
				state.accessToken = "";
				return;
			}

			state.loggedIn = true;
			state.accessToken = token;
		})

		builder.addCase(asyncFetchAccessToken.fulfilled, (state, action) => {
			state.loggedIn = true;
			state.accessToken = action.payload;
		})

	}
})

const store = configureStore({
	reducer: {
		auth: authSlice.reducer
	},
})

// Types for TypeScript compatibalility
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const { logout } = authSlice.actions;
export default store;