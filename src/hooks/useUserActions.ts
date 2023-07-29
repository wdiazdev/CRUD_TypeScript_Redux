import { useDispatch } from "react-redux";
import { addNewUser, deleteUserById } from "../store/users/slice";
import { UserId, UserWithId } from "../types";

export const useUserActions = () => {
	const dispatch = useDispatch();

	const addUser = ({ name, email, github }: UserWithId) => {
		dispatch(addNewUser({ name, email, github }));
	};

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};
	return { removeUser, addUser };
};
