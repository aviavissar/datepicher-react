import React from 'react';
import { startSetYeras, startSetMonths, handleSetDays, handleSetDate, handleNext_prevBt } from '../actions/pickerActions';
import { connect } from 'react-redux';

class MySelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.date = new Date();
        this.state = ({
            ...this.props,
            months: startSetMonths(),
            years: startSetYeras(),
            showItems: false,
            days: this.props.days,
            selectedItem: this.props.optionState
        })
    }


    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }))
    }

    shouldComponentUpdate(nextProps, nextState){

        console.log(this.props.thedays)
        return true
    }

    closeDropDown = () => {
        this.setState(prevState => ({
            showItems: false
        }))
    }

    selectItem = (item, item2selectd) => {
        this.setState({
            selectedItem: item2selectd,
            showItems: false,
        })
        this.props.onChange(item)

    }


    render() {
        return (
            <div>
                <div className={`${this.state.showItems ? 'select-box--box shedow' : 'select-box--box '}`}>
                    <div className='select-box--container' >
                        <div onClick={this.dropDown}>
                            <div className="select-box--selected-item">
                                {this.props.optionState}
                            </div>
                            <div className="select-box--arrow">
                                <span
                                    className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}>
                                </span>
                            </div>
                        </div>

                        <div style={{ display: this.state.showItems ? 'block' : 'none' }}
                            className="select-box--items" >

                            {this.state.years.map((year) => { //making the select box
                                return this.state.months.map((mo, index) => {
                                    if (Number(year) === this.date.getFullYear() && index < this.date.getMonth()) {
                                        // debugger
                                        return;
                                    }
                                    else {
                                        return (
                                            <div key={mo + " " + year}
                                                className={this.state.selectedItem === mo + " " + year ? 'selected' : ''}
                                                onClick={() => this.selectItem(year + " " + index, mo + " " + year)}
                                                selected={(year + " " + index) == this.props.optionState ? 'selected' : false}
                                                value={year + " " + index}>
                                                {mo + " " + year}
                                            </div>
                                        )
                                    }
                                })
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
console.log(state.days)
    return {
        thedays: state.days
    };
};



export default connect(mapStateToProps) (MySelectBox);