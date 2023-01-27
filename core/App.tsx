import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Button,
  Alert,
  Linking,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {RecoilRoot} from 'recoil';
import {Link, Route, Router, Routes} from './Router';
import {Sources} from './Sources';
import qs from 'qs';
import randomString from 'random-string';
import Hashes from 'jshashes';

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

const config = {
  // I am aware the ClientID is in here, however, the app is not confidential and the ID will change soon.
  // trunk-ignore(gitleaks/generic-api-key)
  clientId: '6975558cf8663dde5c7c534a4241c0bda09e8b8f',
  redirectUrl: 'my-demo://demo/',
  scopes: ['profile'],
  authorizationEndpoint: 'https://identity.goud.host/application/o/authorize',
  tokenEndpoint: 'https://identity.goud.host/application/o/token/',
};

const App = () => {
  // React.useEffect(() => {
  //     prefetchConfiguration({
  //       warmAndPrefetchChrome: true,
  //       connectionTimeoutSeconds: 5,
  //       ...config,
  //     });

  //   }, []);

  function makeid(length: number) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const test = async () => {
    try {
        

        const code_verifier = randomString({length: 40});
        const code_challenge = new Hashes.SHA256().b64(code_verifier)
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/g, '')

      const authState = makeid(30);
      const url = `${config.authorizationEndpoint}?client_id=${
        config.clientId
      }&redirect_uri=${
        config.redirectUrl
      }&response_type=code&scope=${config.scopes.join(' ')}&state=${makeid(
        30,
      )}&code_challenge_method=S256&code_challenge=${code_challenge}`;

      await AsyncStorage.setItem('codeVerifier', code_challenge || '');
      await AsyncStorage.setItem('authState', authState || '');

      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(url, 'my-demo://demo/', {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          ephemeralWebSession: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        
        const code = (result as any).url.substring(21, 53);
        const params = new URLSearchParams();
        params.append("grant_type", 'authorization_code');
        params.append("client_id", config.clientId);
        params.append("code_verifier", code_verifier);
        params.append("code", code);
        params.append("redirect_uri", 'my-demo://demo/');
        const res = await axios.post(config.tokenEndpoint, params.toString());
        console.log(res.data)
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
        console.log((error as any).response.data)
      Alert.alert((error as any).message);
    }
  };

  return (
    <>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 24}}>Test</Text>
          <Button title="Open InAppBrowser" onPress={test} />
          {/* <Navigation /> */}
        </View>
      </SafeAreaView>
    </>
  );
};
export default App;
