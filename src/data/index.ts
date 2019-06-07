import moment from 'moment';
import { compareDates } from '../lib/date-utils';
import Timespan from '../lib/Timespan';

const DATE_FORMAT = 'YYYY-MM-DD'

const data: Timespan[] = [
    new Timespan({
        title: 'Иван Вазов',
        start: moment('1850-7-9', DATE_FORMAT),
        end: moment('1921-9-22', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Xристо Ботев',
        start: moment('1848-1-6', DATE_FORMAT),
        end: moment('1876-6-2', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Пейо Яворов',
        start: moment('1878-1-1', DATE_FORMAT),
        end: moment('1914-10-29', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Васил Левски',
        start: moment('1837-07-18', DATE_FORMAT),
        end: moment('1873-02-18', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Пенчо Славейков',
        start: moment('1866-04-27', DATE_FORMAT),
        end: moment('1912-06-10', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Петко Рачов Славейков',
        start: moment('1827-11-17', DATE_FORMAT),
        end: moment('1895-07-01', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Петър Берон',
        start: moment('1799-01-01', DATE_FORMAT),
        end: moment('1871-03-21', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Никола Вапцаров',
        start: moment('1909-12-07', DATE_FORMAT),
        end: moment('1942-07-23', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Гео Милев',
        start: moment('1895-1-15', DATE_FORMAT),
        end: moment('1925-05-15', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Димчо Дебелянов',
        start: moment('1887-03-28', DATE_FORMAT),
        end: moment('1916-10-02', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Елин Пелин',
        start: moment('1877-07-8', DATE_FORMAT),
        end: moment('1949-12-03', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Емилиян Станев',
        start: moment('1907-02-28', DATE_FORMAT),
        end: moment('1979-03-15', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Георги Бенковски',
        start: moment('1843-09-21', DATE_FORMAT),
        end: moment('1876-05-24', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Георги Сава Раковски',
        start: moment('1821-01-01', DATE_FORMAT),
        end: moment('1867-10-09', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Захари Стоянов',
        start: moment('1850-01-01', DATE_FORMAT),
        end: moment('1889-9-2', DATE_FORMAT),
    }),
    new Timespan({
        title: 'Иларион Драгостинов',
        start: moment('1852-01-01', DATE_FORMAT),
        end: moment('1876-5-10', DATE_FORMAT),
    }),
].sort((v1, v2) => compareDates(v1.data.start, v2.data.start));

export default data;