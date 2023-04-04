import { Button, Text, TextInput, View } from "react-native";
import { useAppDispatch } from "../store";
import { useEffect } from "react";
import { Event, useBearStore } from "../store/events";
import { shallow } from 'zustand/shallow';
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
// import { asyncFetchEvents } from "../store/events/eventSlice";

export function CalendarView() {
	const { init, events } = useBearStore((state: any) => ({ init: state.init, events: state.events }));

	useEffect(() => {
		init();
	}, [])

	console.log(events)
	return <>
		<Text style={{ fontSize: 24 }}>Calendar</Text>
		<CalendarEventCreate />
		{events.map((event: Event) => <CalendarEvent key={event.id} event={event} />)}
	</>
}

function CalendarEvent({ event }: { event: Event }) {
	return <View style={{ borderColor: "black", borderWidth: 2 }}>
		<Text>{event.title}</Text>
		<Text>{event.description}</Text>
		<Text>{event.location}</Text>
		<Text>{event.start.toISOString()}</Text>
		<Text>{event.end.toISOString()}</Text>
		<Text>{event.allDay}</Text>
	</View>
}

function CalendarEventCreate() {
	const createEvent = useBearStore((state: any) => state.create);

	const { control, handleSubmit, formState: { errors } } = useForm({
		defaultValues: {
			title: '',
			description: '',
			location: '',
			start: new Date(),
			end: new Date(),
			allDay: false,
		}
	});
	const onSubmit = data => createEvent(data);

	return <View>
		<Controller
			control={control}
			rules={{
				required: true,
			}}
			render={({ field: { onChange, onBlur, value } }) => (
				<TextInput
					placeholder="Title"
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
				/>
			)}
			name="title"
		/>
		{errors.title && <Text>This is required.</Text>}

		<Controller
			control={control}
			rules={{
				required: true,
			}}
			render={({ field: { onChange, onBlur, value } }) => (
				<TextInput
					placeholder="Description"
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
				/>
			)}
			name="description"
		/>
		{errors.description && <Text>This is required.</Text>}

		<Controller
			control={control}
			rules={{
				required: true,
			}}
			render={({ field: { onChange, onBlur, value } }) => (
				<TextInput
					placeholder="Location"
					onBlur={onBlur}
					onChangeText={onChange}
					value={value}
				/>
			)}
			name="location"
		/>
		{errors.location && <Text>This is required.</Text>}

		<Button title="Submit" onPress={handleSubmit(onSubmit)} />
	</View>;
}

