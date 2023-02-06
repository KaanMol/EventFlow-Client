import { Text } from "react-native";
import { Link } from "react-router-native";

export function Navigation() {
    return (
        <>
            <Link to="/">
                <Text>Home</Text>
            </Link>
            <Link to="/sources">
                <Text>Sources</Text>
            </Link>
            <Link to="/test">
                <Text>Test</Text>
            </Link>
        </>
    );
};