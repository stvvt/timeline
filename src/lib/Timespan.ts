import { DurationInputArg1, DurationInputArg2, Moment } from 'moment';

interface TimespanData {
    title: string;
    start: Moment;
    end: Moment;
    events?: any[];
}

export default class Timespan {
    public readonly duration: number;

    constructor(public readonly data: TimespanData) {
        this.duration = this.data.end.valueOf() - this.data.start.valueOf();
    }

    public isActive(now: Moment): boolean {
        return !this.isInTheFuture(now); // && !this.isInThePast()
    }

    public getElapsedPercent(now: Moment): number {
        const startStamp = this.data.start.valueOf();

        if (this.isInThePast(now)) {
            return 100;
        }

        return (now.valueOf() - startStamp) * 100 / this.duration;
    }

    public age(now: Moment) {
        if (this.isInThePast(now)) {
            return this.data.end.diff(this.data.start, 'years');
        }
        return -this.data.start.diff(now, 'years');
    }

    public isInTheFuture(now: Moment) {
        return this.data.start.isSameOrAfter(now);
    }

    public isInThePast(now: Moment, since?: [DurationInputArg1, DurationInputArg2]) {
        const end = since ? this.data.end.clone().add(...since) : this.data.end
        return end.isSameOrBefore(now);
    }
}

