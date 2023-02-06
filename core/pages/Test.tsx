import { Text, View } from "react-native";
import { Navigation } from "../components/Navigation";
import { FullPageLayout } from "../layout/page/FullPage";

export function Test() {
    return (
        <>
            <FullPageLayout>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 24 }}>Test</Text>
                    <Navigation />
                </View>
            </FullPageLayout>
        </>
    );
};