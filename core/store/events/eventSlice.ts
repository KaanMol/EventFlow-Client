import { create } from 'zustand'
import { request } from '../../common/request'

type RawEvent = {
	id: string,
	title: string,
	description: string,
	start: string,
	end: string,
	all_day: boolean,
}

export type Event = {
	id: string,
	title: string,
	description: string,
	start: Date,
	end: Date,
	allDay: boolean,
}

export type EventState = {
	events: Event[],
	init: () => Promise<void>,
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
		}));


		set((state) => ({ events }))
	},
}))