import { Text, View } from "react-native";
import { useAppDispatch } from "../store";
import { useEffect } from "react";
import { Event, useBearStore } from "../store/events/eventSlice";
import { shallow } from 'zustand/shallow';
// import { asyncFetchEvents } from "../store/events/eventSlice";

export function CalendarView() {
	const { init, events } = useBearStore((state: any) => ({ init: state.init, events: state.events }));

	useEffect(() => {
		init();
	}, [])

	console.log(events)
	return <>
		<Text style={{ fontSize: 24 }}>Calendar</Text>
		{events.map((event: Event) => <CalendarEvent event={event} />)}
	</>
}



function CalendarEvent({ event }: { event: Event }) {


	return <View style={{ borderColor: "black", borderWidth: 2 }}>
		<Text>{event.title}</Text>
		<Text>{event.description}</Text>
		<Text>{event.start.toISOString()}</Text>
		<Text>{event.end.toISOString()}</Text>
		<Text>{event.allDay}</Text>
	</View>
}