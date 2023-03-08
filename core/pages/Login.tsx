import {ActivityIndicator, Button, Text, View} from 'react-native';
import {FullPageLayout} from '../layout/page/FullPage';
import {useCallback, useEffect, useState} from 'react';
import {startAuthFlow} from '../common/auth';
import {useSearchParams, useNavigate} from '../common/router';
import {asyncFetchAccessToken, useAppDispatch} from '../store';
import {authorize} from 'react-native-app-auth';
import {authConfig} from '../config/auth';

import { ActivityIndicator, Button, Text, View } from 'react-native';
import { FullPageLayout } from '../layout/page/FullPage';
import { useCallback, useEffect, useState } from 'react';
import { startAuthFlow } from '../common/auth';
import { useSearchParams, useNavigate } from '../common/router';
import { useAppDispatch } from '../store';
import { asyncFetchAccessToken } from '../store/auth/authSlice';

function LoggingIn() {
  return (
    <>
      <Text style={{fontSize: 24}}>Logging you in, hang on there!</Text>
      <ActivityIndicator size="large" />
    </>
  );
}

export function Login() {
	const [authFlowState, setAuthFlowState] = useState(false);
	let [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

  const config = {
    clientId: authConfig.clientId,
    redirectUrl: authConfig.redirectUrl,
    scopes: authConfig.scopes,
    serviceConfiguration: {
      authorizationEndpoint: authConfig.authorizationEndpoint,
      tokenEndpoint: authConfig.tokenEndpoint,
    },
  };

  const authCb = useCallback(async () => {
    const result = await authorize(config);
    console.log(result);
  }, []);

  //   useEffect(() => {
  //     const code = searchParams.get('code');
  //     if (code !== null) {
  //       setLoggingIn(true);
  //       dispatch(asyncFetchAccessToken(code)).then(() => {
  //         navigate('/');
  //       });
  //     }
  //   }, [searchParams]);

  return (
    <FullPageLayout>
      <View style={{alignItems: 'center'}}>
        {loggingIn === true ? (
          <LoggingIn />
        ) : (
          <>
            <Text style={{fontSize: 24}}>
              Are you ready to plan your next adventure?
            </Text>
            <Button title="Login" onPress={authCb} />
          </>
        )}
      </View>
    </FullPageLayout>
  );
}
