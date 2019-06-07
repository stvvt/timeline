import { Moment } from 'moment';

export function compareDates(v1: Moment, v2: Moment) {
    return v1.isBefore(v2) ? -1 : v1.isAfter(v2) ? 1 : 0;
}
