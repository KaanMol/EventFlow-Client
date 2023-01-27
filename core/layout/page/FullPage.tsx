import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

export function FullPageLayout(props: { children: JSX.Element[] | JSX.Element }) {
	return (
		<>
			<SafeAreaView>
				<View style={{ alignItems: 'center' }}>
					{props.children}
				</View>
			</SafeAreaView>
		</>
	);
};