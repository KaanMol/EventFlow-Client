import React, { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native";

// idk react best practices dus niet judgen ok

const uriRegex =
	/(https?|webcals):\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

export function Import() {
	const [icalUri, setIcalUri] = useState("");
	const [name, setName] = useState("");

	const [uriError, setUriError] = useState<string | null>(null);
	const [nameError, setNameError] = useState<string | null>(null);

	useEffect(() => {
		if (icalUri.length === 0) {
			setUriError("iCAL URI is required");
			return;
		}

		setUriError(icalUri.match(uriRegex) ? null : "Invalid URI");
	}, [icalUri]);

	useEffect(() => {
		setNameError(name.length === 0 ? "Name is required" : null);
	}, [name]);

	return (
		<>
			<Text>Import iCal calendar</Text>

			<Text>{uriError}</Text>
			<TextInput
				placeholder="iCal URI"
				style={{ borderColor: uriError ? "red" : "black" }}
				onChangeText={setIcalUri}
			/>

			<Text>{nameError}</Text>
			<TextInput
				placeholder="Name"
				style={{ borderColor: nameError ? "red" : "black" }}
				onChangeText={setName}
			/>
			<Button title="Import" onPress={submit} />
		</>
	);

	function submit() {
		console.log("uriError", uriError);
		console.log("nameError", nameError);

		if (uriError || nameError) {
			return;
		}

		console.log("submitted", icalUri, name);
	}
}
