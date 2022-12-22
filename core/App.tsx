import React from 'react';
import {SafeAreaView, StatusBar, Text, View, Button} from 'react-native';

import {RecoilRoot} from 'recoil';
import {Link, Route, Router, Routes} from './Router';
import {Sources} from './Sources';

const Home = () => {
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24}}>React Native Web App Example</Text>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <Sources />
          </React.Suspense>
          <Link to="/test">
            <Text>Go to Test</Text>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

const Test = () => {
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24}}>Test</Text>
          <Link to="/">
            <Text>Go to Home</Text>
          </Link>
        </View>
      </SafeAreaView>
    </>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};
export default App;
