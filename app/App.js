import React from 'react';

/** Components */
import TodoTable from './components/todos/TodoTable.js';
import TodoForm from './components/todos/TodoForm.js';

import D3Container from './components/d3/D3Container.js';

/** Styles */
const style = {
  containerStyle: {
    width: 800
  },
  subContainerStyle: {
    width: 400,
    float: 'left'
  }
};

class App extends React.Component {
	render() {
    return (
      <div className="center-block top15" style={style.containerStyle}>
        <div style={style.subContainerStyle}>
          <TodoForm />

          <h1>Todo's</h1>
          <TodoTable />
        </div>
        <D3Container style={style.subContainerStyle}>

        </D3Container>
      </div>
    );
  }
}
	
export default App;
