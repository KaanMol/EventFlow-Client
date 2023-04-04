import { create } from 'zustand';
import { request } from '../common/request';

type RawEvent = {
	id: string,
	title: string,
	description: string,
	start: string,
	end: string,
	all_day: boolean,
	location: string,
}

export type Event = {
	id: string,
	title: string,
	description: string,
	start: Date,
	end: Date,
	allDay: boolean,
	location: string,
}

export type EventState = {
	events: Event[],
	init: () => Promise<void>,
	create: (event: Event) => Promise<void>
};

export const useBearStore = create<EventState>()((set) => ({
	events: [],
	init: async () => {
		const req = await request.get("/events");
		const events: Event[] = req.data.data.map((event: RawEvent) => ({
			id: event.id,
			title: event.title,
			description: event.description,
			start: new Date(event.start),
			end: new Date(event.end),
			allDay: event.all_day,
			location: event.location,
		}));


		set((state) => ({ events }))
	},
	create: async (event: Event) => {
		const req = await request.post("/events", {
			title: event.title,
			description: event.description,
			start: event.start.toUTCString(),
			end: event.end.toUTCString(),
			all_day: event.allDay,
			location: event.location,
		});

		const newEvent = { ...req.data.data, start: new Date(req.data.data.start), end: new Date(req.data.data.end) }

		console.log(newEvent)

		set((state) => ({ events: [...state.events, newEvent] }))
	}
}))