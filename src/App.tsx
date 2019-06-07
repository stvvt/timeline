import { Button, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Slider } from '@material-ui/lab';
import { KeyboardDatePicker, MaterialUiPickersDate } from '@material-ui/pickers';
import { createStyles } from '@material-ui/styles';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import AppBar from './components/AppBar';
import Progresses from './components/Progresses';
import data from './data';
import { compareDates } from './lib/date-utils';
import theme from './theme';

function arrayMax<T>(arr: T[], compare: (v1: T, v2: T) => -1 | 0 | 1) {
    let max = arr[0];
    for (let i = 1; i < arr.length; ++i) {
        if (compare(arr[i], max) > 0) {
            max = arr[i];
        }
    }

    return max;
}

function arrayMin<T>(arr: T[], compare: (v1: T, v2: T) => -1 | 0 | 1) {
    return arrayMax(arr, (v1: T, v2: T) => compare(v2, v1))
}

const minDate = arrayMin(data.map(span => span.data.start), compareDates);
const maxDate = arrayMax(data.map(span => span.data.end), compareDates);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
    }),
);

const UPDATE_INTERVAL = 500;
const UPDATE_STEP = [12, 'month'];

function stepForward(date: Moment) {
    return date.add(...UPDATE_STEP);
}

function stepBackward(date: Moment) {
    const [amount, unit] = UPDATE_STEP;
    return date.add(...[-amount, unit]);
}

export default function App() {
    const classes = useStyles(theme);
    const [selectedDate, setSelectedDate] = useState(minDate);
    const [startDate, setStartDate] = useState(minDate);
    const [endDate, setEndDate] = useState(maxDate);
    const [interval, setIntervalHandle] = useState<NodeJS.Timeout>();

    function stop(interval: NodeJS.Timeout) {
        clearInterval(interval);
        setIntervalHandle(undefined);
    }

    function toggle() {
        if (interval) {
            stop(interval);
        } else {
            const intervalHandle = setInterval(() => {
                setIntervalHandle(intervalHandle);
                setSelectedDate((current) => {
                    const newDate = stepForward(moment(current));
                    if (newDate.isBefore(maxDate)) {
                        return newDate;
                    }

                    stop(intervalHandle);
                    return maxDate;
                });
            }, UPDATE_INTERVAL);
        }
    }

    function getSliderValue() {
        return (selectedDate.valueOf() - startDate.valueOf())/(endDate.valueOf() - startDate.valueOf()) * 100;
    }

    function setSliderValue(value: number) {
        setSelectedDate(moment(new Date(startDate.valueOf() + value/100 * (endDate.valueOf() - startDate.valueOf()))));
    }

    return (
        <React.Fragment>
            <AppBar />
            <Container>
                <Box my={5}>
                    <Grid container>
                        <Grid item xs>
                            <Typography variant="h4" component="h1" gutterBottom>
                                Timeline
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Grid container justify="flex-end">
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => toggle()}>
                                    {
                                        interval ? (
                                            <React.Fragment>
                                                Pause
                                                <PauseIcon className={classes.rightIcon} />
                                            </React.Fragment>
                                        ) : (
                                                <React.Fragment>
                                                    Auto
                                                    <PlayArrowIcon className={classes.rightIcon} />
                                                </React.Fragment>
                                            )
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box my={2}>
                        <Grid container >
                            <Grid item xs={3}>
                                <Grid container>
                                    <KeyboardDatePicker
                                        label="Start"
                                        format="DD/MM/YYYY"
                                        value={startDate}
                                        minDate={minDate}
                                        maxDate={endDate}
                                        disabled={!!interval}
                                        onChange={(date: MaterialUiPickersDate) => { 
                                            if (!date) {
                                                return;
                                            }
                                            if (selectedDate.isBefore(date)) {
                                                setSelectedDate(date);
                                            }

                                            setStartDate(date); 
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container justify="center">
                                    <Button variant="contained" color="secondary" className={classes.button} disabled={!!interval}
                                        onClick={() => setSelectedDate(stepBackward(moment(selectedDate))) }>
                                        <ArrowLeftIcon />
                                    </Button>

                                    <KeyboardDatePicker
                                        label="Date"
                                        format="DD/MM/YYYY"
                                        value={moment(selectedDate)}
                                        minDate={startDate}
                                        maxDate={endDate}
                                        onChange={(date: MaterialUiPickersDate) => date && setSelectedDate(date)}
                                    />
                                    <Button variant="contained" color="secondary" className={classes.button} disabled={!!interval}
                                        onClick={() => setSelectedDate(stepForward(moment(selectedDate))) } >
                                        <ArrowRightIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={3}>
                                <Grid container justify="flex-end">
                                    <KeyboardDatePicker
                                        label="End"
                                        format="DD/MM/YYYY"
                                        value={endDate}
                                        minDate={startDate}
                                        maxDate={maxDate}
                                        disabled={!!interval}
                                        onChange={(date: MaterialUiPickersDate) => {
                                            if (!date) {
                                                return;
                                            }
                                            if (selectedDate.isAfter(date)) {
                                                setSelectedDate(date);
                                            }
                                            setEndDate(date)
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                            <Slider min={0} max={100} value={getSliderValue()} onChange={(event, value) => setSliderValue(value)}/>
                        </Box>
                    <Box my={2}>
                        <Paper square={true} elevation={3} color="primary">
                            <Progresses historyData={data.filter(span => !span.isInTheFuture(selectedDate))} now={selectedDate} startStamp={startDate.valueOf()} duration={endDate.valueOf() - startDate.valueOf()} />
                        </Paper>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    );
}