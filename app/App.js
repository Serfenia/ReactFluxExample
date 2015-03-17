import React from 'react';

/** Components */
import TodoTable from './components/todos/TodoTable.js';
import TodoForm from './components/todos/TodoForm.js';

/** Styles */
const containerStyle = {width: 400};

class App extends React.Component {
	render() {
    return (
      <div className="center-block top15" style={containerStyle}>
        <TodoForm />

        <h1>Todo's</h1>
        <TodoTable />
      </div>
    );
  }
}
	
export default App;
