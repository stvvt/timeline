import { Box, Collapse, Divider, Fade, LinearProgress, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Moment } from 'moment';
import React from 'react';
import Timespan from '../lib/Timespan';

interface ProgressesProps {
    historyData: Timespan[];
    now: Moment;
    startStamp: number;
    duration: number;
}

export default function Progresses({ historyData, now, startStamp, duration }: ProgressesProps) {
    const data = historyData;
    return (
        <React.Fragment>
        <List>
            {data.map((span) => (
                <Collapse in={!span.isInThePast(now, [3, 'years'])} key={span.data.title} timeout={{enter: 1000, exit: 2000}} >
                    <Fade in={!span.isInThePast(now)} timeout={{enter: 1000, exit: 3500}}>
                        <ListItem>
                            <ListItemText>
                                <Typography>{span.data.title} ({span.age(now)})</Typography>
                                <Divider />
                                <LinearProgress
                                    variant="determinate"
                                    value={span.getElapsedPercent(now)}
                                    style={{width: `${span.duration/duration*100}%`, marginLeft: `${(span.data.start.toDate().getTime() - startStamp)*100/duration}%`}}
                                />
                            </ListItemText>
                        </ListItem>
                    </Fade>
                </Collapse>
            ))}
        </List>
        { data.length === 0 && (
            <Box p={10}>
                <Typography align="center" variant="h5" color="textSecondary">No Data</Typography>
            </Box>
        )}
        </React.Fragment>
    );
}