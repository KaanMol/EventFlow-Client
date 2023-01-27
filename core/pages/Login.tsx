import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Hashes from "jshashes";
import randomString from "random-string";
import { Alert, Button, Linking, Text, View } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import authConfig from "../config/auth";
import { FullPageLayout } from "../layout/page/FullPage";

export function Login() {
    const test = async () => {
        try {
            const codeVerifier = randomString({ length: 40 });
            const codeChallenge = new Hashes.SHA256().b64(codeVerifier)
                .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+/g, '')

            const authState = randomString({ length: 30 });
            const url = `${authConfig.authorizationEndpoint}?client_id=${authConfig.clientId
                }&redirect_uri=${authConfig.redirectUrl
                }&response_type=code&scope=${authConfig.scopes.join(' ')}&state=${authState}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

            await AsyncStorage.setItem('codeVerifier', codeChallenge || '');
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
                });

                const code = (result as any).url.substring(21, 53);
                const params = new URLSearchParams();
                params.append("grant_type", 'authorization_code');
                params.append("client_id", authConfig.clientId);
                params.append("code_verifier", codeVerifier);
                params.append("code", code);
                params.append("redirect_uri", 'my-demo://demo/');
                const res = await axios.post(authConfig.tokenEndpoint, params.toString());
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
        <FullPageLayout>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Are you ready to plan your next adventure?</Text>
                <Button title="Login" onPress={test} />
            </View>
        </FullPageLayout>
    );
}