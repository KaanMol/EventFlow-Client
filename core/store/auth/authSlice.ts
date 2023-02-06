import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Storage } from "../../common/storage";
import { fetchAccessToken } from "../../common/token";

export const authSlice = createSlice({
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

export const { logout } = authSlice.actions;

export const initAuth = createAsyncThunk("/auth/init", async () => {
	const token = await Storage.getItem('auth.access_token');
	return token;
})

export const asyncFetchAccessToken = createAsyncThunk("/auth/token", fetchAccessToken)


