import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import auth from '../config/auth';
import { fetchAccessToken, generateAuthPrerequisites } from './token';

export async function startAuthFlow() {
	const { url } = await generateAuthPrerequisites();
	const result = await startInAppBrowser(url);
	return await fetchAccessToken((result as any).url.substring(21, 53))
};

async function startInAppBrowser(url: string) {
	console.log(await InAppBrowser.isAvailable())
	if (await InAppBrowser.isAvailable() === false) {

		return Linking.openURL(url);
	}

	return await InAppBrowser.openAuth(url, auth.redirectUrl, {
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
}