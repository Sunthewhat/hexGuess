import { clearEmptyRooms } from '../services/socket/roomManager';

const time = {
	seconds: (s: number) => s * 1000,
	minutes: (m: number) => m * time.seconds(60),
	hours: (h: number) => h * time.minutes(60),
	days: (d: number) => d * time.hours(24),
	weeks: (w: number) => w * time.days(7),
	months: (m: number) => m * time.days(30),
	years: (y: number) => y * time.days(365),
};

const scheduledExecutor = () => {
	setInterval(() => clearEmptyRooms(), time.minutes(20));
};

export { scheduledExecutor };
