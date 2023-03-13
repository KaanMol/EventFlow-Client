import { Text } from "react-native";
import { Link } from "react-router-native";

export function Navigation() {
	return (
		<>
			<Link to="/">
				<Text>Home</Text>
			</Link>
			<Link to="/settings">
				<Text>Settings</Text>
			</Link>
			<Link to="/import">
				<Text>Import</Text>
			</Link>
		</>
	);
}
