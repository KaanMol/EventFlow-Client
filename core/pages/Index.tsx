import { Text } from "react-native";
import { FullPageLayout } from "../layout/page/FullPage";

export function Index() {
    return (
        <FullPageLayout>
            <Text style={{ fontSize: 24 }}>Logged In</Text>
        </FullPageLayout>
    );
}
