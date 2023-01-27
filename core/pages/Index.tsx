import {Button, Text} from 'react-native';
import {FullPageLayout} from '../layout/page/FullPage';

export function Index(props: {logout: () => void}) {
  return (
    <FullPageLayout>
      <Text style={{fontSize: 24}}>Logged In</Text>
      <Button onPress={props.logout} title="Logout!" />
    </FullPageLayout>
  );
}
