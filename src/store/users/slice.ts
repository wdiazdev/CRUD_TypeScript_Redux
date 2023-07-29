import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User, UserId, UserWithId } from "../../types/index";

const defaultState = [
	{
		id: "1",
		name: "Peter Williams",
		email: "peter@example.com",
		github: "PeterDoe",
	},
	{
		id: "2",
		name: "Wil Ramirez",
		email: "wil@example.com",
		github: "Wildoe",
	},
	{
		id: "3",
		name: "Carlos Ortiz",
		email: "alex@example.com",
		github: "Alexdoe",
	},
];

//? Another logic that works!
// let initialState: UserWithId[] = defaultState;

// const persistanceState = localStorage.getItem("_redux_state_");
// if (persistanceState) {
// 	initialState = JSON.parse(persistanceState).users;
// }

const initialState: UserWithId[] = (() => {
	const persistanceState = localStorage.getItem("_redux_state_");
	return persistanceState ? JSON.parse(persistanceState).users : defaultState;
})();

export const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserDefined = state.some((user) => user.id === action.payload.id);
			if (!isUserDefined) {
				return [...state, action.payload];
			}
		},
	},
});

export default userSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = userSlice.actions;
