import React, { Component } from 'react';
import { startSetYeras, startSetMonths, handleSetDays, handleSetDate, handleNext_prevBt } from '../actions/pickerActions';
import { connect } from 'react-redux';
import ArrowIcon from '../assets/icons/arrow';
import MySelect from '../mySelectBox.component/mySelectBox.component'

const PICKER_HEADER = "תאריך יציאה";
const DAYSֹֹ_ARRAY = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
const ACTION_TYPE = 'GOING_DATE';


class Datepicker extends Component {
    constructor() {
        super();
        this.date = new Date();
        const [selectedYear, selectedMonth, ...days] = handleSetDays(this.date.getFullYear(), this.date.getMonth());
        this.actionType = ACTION_TYPE;
        this.pickerheader = PICKER_HEADER;
        this.state = ({
            months: startSetMonths(),
            years: startSetYeras(),
            selectedYear,
            selectedMonth,
            days,
            isDatePickerOpen: true,
            btclass: 'daybt'
        })
        this.flg = true;
        this.dateHandle = this.dateHandle.bind(this);
    }



    //update state with the selected year mounth and the days array when we chenge the select 
    handleSelectChange = (item) => {
        const [year, mounth] = item.split(' ');
        const [selectedYear, selectedMonth, ...days] = handleSetDays(Number(year), Number(mounth))

        this.setState({
            days: days,
            selectedYear: Number(year),
            selectedMonth: Number(mounth)
        })
    }


    //close the datepicker
    onClose = () => {
        this.setState({ isDatePickerOpen: false })
    }



    //handle the prev/next buttons and coordination with the selext box
    handleBt = (oneMonthDirection) => {

        const { year, month } = // retrun the prev/next month
            handleNext_prevBt(this.state.selectedYear, this.state.selectedMonth, oneMonthDirection);

        handleSetDays(Number(year), Number(month));//brings the days
        this.setState({
            selectedMonth: month,
            selectedYear: year
        })
        this.handleSelectChange(year + " " + month)
    }



    //saving on redux
    dateHandle = (possibleGoing, day) => {
        let message;
        if (possibleGoing) {
            this.flg = false;
            let objpic = handleSetDate(this.state.selectedYear, this.state.selectedMonth, day, this.actionType); //saving on redux
            this.picday = objpic.day;
            this.pickedmonth = objpic.month;
            this.pickedyear = objpic.year;
            this.setState({
                btclass: this.setTheCssClass(possibleGoing, day)
            });
            message = objpic.date.toString();
        }
        else {
            message = 'you can chose only mark';
        }

        this.props.onOperationDone(message);  //send message to father component
    }


    //give the day his proper class
    setTheCssClass = (possibleGoing, day) => {
        let theClassName = 'daybt'
        if (
            possibleGoing && day === this.picday &&
            this.state.selectedYear === this.pickedyear && this.state.selectedMonth === this.pickedmonth) {
            theClassName = theClassName + " activebt daycircle";
        }
        else if (possibleGoing && day > 0) {
            theClassName = theClassName + " daycircle"
        }
        return theClassName
    }



    render() {
        if (!this.state.isDatePickerOpen) return null;
        return (
            <div className="pickerWrap">
                <div className="close">
                    <button className="close" onClick={this.onClose}>X</button>
                </div>

                <div className="innerwrap">
                    <h1>{this.pickerheader}</h1>  {/* //var to select a header for the picker */}

                    <div className="monthsdiv">
                        <button className={this.disabledRight ? "bt bt-right disablebt" : "bt bt-right"} id="rightBt"
                            disabled={this.date.getMonth() == this.state.selectedMonth &&
                                this.date.getFullYear() == this.state.selectedYear ? true : false}
                            onClick={() => this.handleBt(-1)}>
                            <ArrowIcon id="rightBt" className="arrow" /> {/*svg component */}
                        </button>

                        <MySelect ref={this.child} id="mySelect"
                            years={this.state.selectedYear}
                            months={this.state.selectedMonth}
                            optionState={this.state.months[this.state.selectedMonth] + " " + this.state.selectedYear}
                            onChange={this.handleSelectChange}>

                        </MySelect>

                        <button className={this.disabledLeft ? "bt bt-left disablebt" : "bt bt-left"} id="leftBt"
                            disabled={this.state.months.length - 1 == this.state.selectedMonth &&
                                this.state.years[this.state.years.length - 1] == this.state.selectedYear}
                            onClick={() => this.handleBt(1)}>
                            <ArrowIcon id="leftBt" className="arrow-negative" />
                        </button>
                    </div>


                    <div className="grid-container">
                        {//  making the days header you can change the DAYSֹֹ_ARRAYARRY const to what you choose
                            DAYSֹֹ_ARRAY.map((day, index) => {
                                return <div key={day + "H" + index} className="grid-item day-title">{day}'</div>
                            })
                        }
                        {  //making the days every dat is obj that has num and a possibleGoing value
                            this.state.days.map(({ possibleGoing = '', day }, indx) => {

                                return (
                                    <div key={day + "dayd" + indx} className="grid-item">
                                        <button onClick={(e) => this.dateHandle(possibleGoing, day)}
                                            id={day} value={day}
                                            // put daycircle class if possibleGoing
                                            className={this.flg ? (possibleGoing && day > 0 ? "daycircle " + this.state.btclass : this.state.btclass) : this.setTheCssClass(possibleGoing, day)}>

                                            {day === 0 ? "" : day}
                                        </button>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="mikra">
                        <ul>
                            <li><i className=" fa fa-circle my-circle blue"></i>תאריכי חזרה אפשרים</li>
                            <li><i className="fa fa-circle my-circle pink"></i>אפשרית טיסת צ'ארטר בתאריכים אילו</li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    days: (year, month) => dispatch(handleSetDays(year, month)),  //retrun days array
    next_prevDays: (year, month, oneMonthDirection) => dispatch(handleNext_prevBt(year, month, oneMonthDirection)),  //retrun next/prev days array
    chosenDate: (year, month, day, theAction) => dispatch(handleSetDate(year, month, day, theAction)),
});

export default connect(undefined, mapDispatchToProps)(Datepicker);