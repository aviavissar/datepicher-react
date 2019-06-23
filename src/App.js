import React, { Component } from 'react';
import Message from './testingMessage.component/testingMessage.component'
import Datepicker from './datepicker.component/datepicker.component';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ""
    }
  }

  onOperationDone = (msg) => {
    this.setState({ msg });
  }
  render() {
    return (
      <div className="App">
       

        <Datepicker onOperationDone={this.onOperationDone} />
       <Message theMsg={this.state.msg} />
      

      </div>
    );
  }
}

export default App;
