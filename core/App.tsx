import React, { useCallback, useState } from 'react';
import {SafeAreaView, StatusBar, Text, View, Button, Alert} from 'react-native';
import { authorize, prefetchConfiguration } from 'react-native-app-auth';

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

const defaultState = {
    hasLoggedInOnce: false,
    accessToken: "",
    accessTokenExpirationDate: "",
    refreshToken: ""
}

const config = {
    clientId: '6975558cf8663dde5c7c534a4241c0bda09e8b8f',
    redirectUrl: 'io.identityserver.demo:/oauthredirect',
    scopes: ['profile'],
    dangerouslyAllowInsecureHttpRequests: true,
    responseType: 'code',

    serviceConfiguration: {
      authorizationEndpoint: 'https://identity.goud.host/application/o/authorize',
      tokenEndpoint: 'https://identity.goud.host/application/o/token',
    }
}

const App = () => {
    // React.useEffect(() => {
    //     prefetchConfiguration({
    //       warmAndPrefetchChrome: true,
    //       connectionTimeoutSeconds: 5,
    //       ...config,
    //     });

    //   }, []);

    const [state, setState] = useState(defaultState);

    const handleAuthorize = useCallback(
        async () => {
          try {
            const newAuthState = await authorize({
              ...config,
              connectionTimeoutSeconds: 5
            });

            console.log(newAuthState)
    
            setState({
              hasLoggedInOnce: true,
              provider: "identityserver",
              ...(newAuthState as any),
            });
          } catch (error) {
            console.log(error)
            // Alert.alert('Failed to log in', (error as any).message);
          }
        },
        [state],
      );
    return (
        <>
          <SafeAreaView>
            <StatusBar barStyle="dark-content" />
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 24}}>Test</Text>
              <Button title="hi" onPress={handleAuthorize} />
              {/* <Navigation /> */}
            </View>
          </SafeAreaView>
        </>
      );
};
export default App;
