import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { UserWithId } from "../types";
import { rollbackUser, default as usersReducer } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("_redux_state_", JSON.stringify(store.getState()));
	};
const syncWithDatabase: Middleware = (store) => (next) => (action) => {
	const { type, payload } = action;
	const previousState = store.getState();

	next(action);

	if (type === "users/addNewUser") {
		fetch(`https://jsonplaceholder.typicode.com/users/`, {
			method: "POST",
			body: JSON.stringify(payload),
		})
			.then((res) => {
				if (res.ok) toast.success(`User ${payload.name} sucessfully added!`);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	if (type === "users/deleteUserById") {
		const userIdToRemove = payload;

		const userToRemove = previousState.users.find(
			(user: UserWithId) => user.id === payload,
		);

		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (res.ok)
					toast.success(`User ${userIdToRemove} sucessfully deleted!`);
			})
			.catch((err) => {
				toast.error(`Error deleting user ${userIdToRemove}`);
				if (userToRemove) {
					store.dispatch(rollbackUser(userToRemove));
				}
				console.log(err);
			});
	}
};

export const store = configureStore({
	reducer: { users: usersReducer },
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabase],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
