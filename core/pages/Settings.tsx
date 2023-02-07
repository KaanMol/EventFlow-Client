import { Button, Text } from 'react-native';
import { FullPageLayout } from '../layout/page/FullPage';

export function Settings(props: { logout: () => void }) {
	return (
		<FullPageLayout>
			<Text style={{ fontSize: 24 }}>Settings</Text>
			<Button onPress={props.logout} title="Logout!" />
		</FullPageLayout>
	);
}
