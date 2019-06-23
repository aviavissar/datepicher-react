import React from 'react';

class MySelectBox extends React.Component {
    constructor(props) {
        super(props);
        this.date = new Date();
        this.state = ({
            ...this.props,
            years: this.props.years || [],
            months: this.props.months || [],
            showItems: false,
            selectedItem: this.props.months[this.date.getMonth()] + " " + this.date.getFullYear()
        })
    }

    dropDown = () => {
        this.setState(prevState => ({
            showItems: !prevState.showItems
        }))
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
                <div  className={`${this.state.showItems ? 'select-box--box shedow' : 'select-box--box '}`}>
                    <div className='select-box--container' >
                        <div onClick={this.dropDown}>
                            <div className="select-box--selected-item">
                                {this.state.selectedItem}
                            </div>
                            <div className="select-box--arrow"

                            >
                                <span
                                    className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}>
                                </span>
                            </div>
                        </div>

                        <div style={{ display: this.state.showItems ? 'block' : 'none' }}
                            className="select-box--items"
                        >

                            {this.state.years.map((year) => { //making the select box
                                return this.state.months.map((mo, index) => {

                                    return (
                                        <div key={mo + " " + year}
                                            className={this.state.selectedItem === mo + " " + year ? 'selected' : ''}
                                            onClick={() => this.selectItem(year + " " + index, mo + " " + year)}
                                            selected={(year + " " + index) == this.props.optionState ? 'selected' : false}
                                            value={year + " " + index}>

                                            {mo + " " + year}

                                        </div>


                                    )
                                })
                            })
                            }


                        </div>


                    </div>

                    <input type="hidden"
                        value={this.state.selectedItem.id}
                        name={this.state.name}

                    />
                </div>

            </div>

        )
    }
}

export default MySelectBox;