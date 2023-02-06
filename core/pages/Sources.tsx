import React from "react";
import { Text } from "react-native";
import { Navigation } from "../components/Navigation";
import { FullPageLayout } from "../layout/page/FullPage";
import { Sources } from "../Sources";

export function CalendarSources() {
    return (
        <>
            <FullPageLayout>
                <Text style={{ fontSize: 24 }}>Event sources</Text>
                <React.Suspense fallback={<Text>Loading...</Text>}>
                    <Sources />
                </React.Suspense>
                <Navigation />
            </FullPageLayout>
        </>
    );
};
