import React from 'react';

/** Components */
import TodoTable from './components/todos/TodoTable.js';
import TodoForm from './components/todos/TodoForm.js';

import D3Container from './components/d3/D3Container.js';

/** Styles */
const style = {
  containerStyle: {
    width: 860
  },
  subContainerStyle: {
    width: 860,
    float: 'left',
    height: 400
  }

};

class App extends React.Component {
	render() {
    return (
      <div className="center-block top15" style={style.containerStyle}>
        <div className="well" style={style.subContainerStyle}>
          <TodoForm />
          <TodoTable />
        </div>
        <D3Container style={style.subContainerStyle} />
      </div>
    );
  }
}
	
export default App;
