import React from 'react';
import {SafeAreaView, StatusBar, Text, View, Button} from 'react-native';

import {RecoilRoot} from 'recoil';
import {Sources} from './Sources';

const App = () => {
  return (
    <RecoilRoot>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24}}>React Native Web App Example</Text>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <Sources />
          </React.Suspense>
          <Button title="test" />
        </View>
      </SafeAreaView>
    </RecoilRoot>
  );
};
export default App;
