import React from "react"
import moment from "moment"

import {
    CalenderWrapper,
    CalendarContainer,
    PagingButton,
    Day,
    DayHeader
} from './CalenderComponent'

export class Calender extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: moment()
        }
    }

    createDaysOfMonth(refDate) {
        const date = moment(refDate).endOf('month')
        const lastDate = date.date();
        const firstWeekDay = date.startOf('month').day();

        const calenderDays = [];

        const today = moment();

        for (let w=0; w<firstWeekDay; w++) {
            calenderDays.push(<Day/>); // empty days
          }

        for (let d = 1; d <= lastDate; d++) {
            calenderDays.push(<Day today={date.date(d).isSame(today, 'day')}>{d}</Day>)
        }

        while (calenderDays.length % 7 !== 0) {
            calenderDays.push(<Day />);
        }

        return calenderDays;
    }

    prevMonth() {
        this.setState({ date: this.state.date.subtract(1, 'month') })
    }

    nextMonth() {
        this.setState({ date: this.state.date.add(1, 'month') })
    }


    render() {
        return (
            <CalenderWrapper>
                <h2>{this.state.date.format('MMMM YYYY')}</h2>
                <div>
                    <PagingButton onClick={this.prevMonth.bind(this)}>&lt;</PagingButton>
                    <PagingButton onClick={this.nextMonth.bind(this)}>&gt;</PagingButton>
                </div>
                <CalendarContainer>
                    <DayHeader>Sunday</DayHeader>
                    <DayHeader>Monday</DayHeader>
                    <DayHeader>Tuesday</DayHeader>
                    <DayHeader>Wednesday</DayHeader>
                    <DayHeader>Thursday</DayHeader>
                    <DayHeader>Friday</DayHeader>
                    <DayHeader>Saturday</DayHeader>
                    {this.createDaysOfMonth(this.state.date)}
                </CalendarContainer>
            </CalenderWrapper>
        )
    }
}