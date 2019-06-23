import React, { Component } from 'react';
import { startSetYeras, startSetMonths, handleSetDays, handleSetDate } from '../actions/pickerActions';
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
            disabledRight: true,
            disabledLeft: false,
            optionState: `${this.date.getFullYear()} ${this.date.getMonth()}`
        })

        this.dateHandle = this.dateHandle.bind(this);
    }

    handleSelectChange = (item) => {   //update state with the selected year mounth and the days array when we chenge the select 
        const [year, mounth] = item.split(' ');
        const [selectedYear, selectedMonth, ...days] = handleSetDays(Number(year), Number(mounth))
        this.setState({
            days: days,
            selectedYear: Number(year),
            selectedMonth: Number(mounth),
        })
    }

    onClose = () => {
        this.setState({ isDatePickerOpen: false })
    }

    handleBt = (one, e) => {  //מטפלת בכפתורי החצים ובתאום שלהם מול תיבת הסלקט
        let year = this.state.selectedYear
        let month = this.state.selectedMonth;

        if (this.date.getMonth() == month && this.date.getFullYear() == year && one == -1) {
            
            //הגענו לקצה התאריכים המוגדר
            this.setState({ disabledRight: true })
            return;
        }
        else if (this.state.months[this.state.months.length - 1] == this.state.months[month] &&
            this.state.years[this.state.years.length - 1] == year && one == 1) {
            this.setState({ disabledLeft: true })
            //הגענו לקצה התאריכים המוגדר
            return;
        }
        else if (month === 0 && one === -1) {
            year--;
            month = month + 11
        }
        else if (month === 11 && one === 1) {
            year++;
            month = month - 11
        } else if (one === -1) {
            month--
        }
        else if (one === 1) {
            month++
        }

        if (e.target.id == "rightBt") {  //פותח את הדיסאבל שלוחצים על כפתור נגדי
            this.setState({ disabledLeft: false });
        } else if (e.target.id == "leftBt") {
            this.setState({ disabledRight: false })
        }
        const [selectedYear, selectedMonth, ...days] = handleSetDays(Number(year), Number(month))
        this.setState({
            days: days,
            selectedYear: selectedYear,
            selectedMonth: selectedMonth,
            optionState: `${selectedYear} ${selectedMonth}`
        })
        
      this.refs.child.selectItem(year + " " + month, this.state.months[month] + " " + year)//to move the select
    }

    dateHandle = (possibleGoing, e) => {
        let message;
        if (possibleGoing) {
            //saving on redux just for optionly use from another components tree
            handleSetDate(this.state.selectedYear, this.state.selectedMonth, e.target.value, this.actionType);

            const date = new Date();
            date.setFullYear(this.state.selectedYear);
            date.setMonth(this.state.selectedMonth);
            date.setDate(e.target.value);
            message = String(date)
        }
        else {
            message = 'you can chose only mark';
        }

        for (var key in this.refs) {
            if (this.refs[key].className == "activebt") {
                console.log(this.refs[key].className = "daycircle daybt");
            }
        }
        if (  e.target.className == "daycircle daybt") {
            e.target.className = "activebt";
        }

        this.props.onOperationDone(message); {/* A JSX comment */ } //send message to father component
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
                        <button className={this.disabledRight?"bt bt-right disablebt" :"bt bt-right" }id="rightBt" disabled={this.state.disabledRight}
                            onClick={(e) => this.handleBt(-1, e)}>
                            <ArrowIcon id="rightBt" className="arrow" /> {/*svg component */}
                        </button>

                        <MySelect ref="child" id="mySelect" 
                        years={this.state.years}
                         months={this.state.months} 
                         optionState={this.state.optionState} 
                         onChange={this.handleSelectChange}>

                        </MySelect>

                        <button className={this.disabledLeft?"bt bt-left disablebt" :"bt bt-left" } id="leftBt" disabled={this.state.disabledLeft}
                            onClick={(e) => this.handleBt(1, e)}>
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
                                        <button onClick={(e) => this.dateHandle(possibleGoing, e)}
                                            id={day} value={day} ref={"ref" + day}
                                            // put daycircle class if possibleGoing
                                            className={possibleGoing && day > 0 ? "daycircle daybt" : "daybt"}>
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
    chosenDate: (year, month, day, type) => dispatch(handleSetDate(year, month, day, type)),
});

export default connect(null, mapDispatchToProps)(Datepicker);