import React from 'react';
import {SafeAreaView, StatusBar, Text, View, Button} from 'react-native';

import {RecoilRoot} from 'recoil';
import {Link, Route, Router, Routes} from './Router';
import {Sources} from './Sources';

const Navigation = () => {
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

const Home = () => {
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24}}>React Native Web App Example</Text>
          <Navigation />
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
          <Navigation />
        </View>
      </SafeAreaView>
    </>
  );
};

const SourcePage = () => {
  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24}}>Event sources</Text>
          <React.Suspense fallback={<Text>Loading...</Text>}>
            <Sources />
          </React.Suspense>
          <Navigation />
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
          <Route path="/sources" element={<SourcePage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};
export default App;
