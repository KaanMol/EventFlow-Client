import { Platform } from "react-native";

export const authConfig = {
	"clientId": "6975558cf8663dde5c7c534a4241c0bda09e8b8f",
	"redirectUrl": Platform.OS === "web" ? "http://localhost:8080/" : "my-demo://demo/",
	"scopes": ["profile"],
	"authorizationEndpoint": "https://identity.goud.host/application/o/authorize",
	"tokenEndpoint": "https://identity.goud.host/application/o/token/",
};