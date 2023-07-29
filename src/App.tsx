import { Toaster } from "sonner";
import "./App.css";
import { ListOfUsers } from "./components/ListOfUsers";
import { CreateNewUser } from "./components/createNewUsers";

function App() {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
			<ListOfUsers />
			<CreateNewUser />
			<Toaster richColors />
		</div>
	);
}

export default App;
