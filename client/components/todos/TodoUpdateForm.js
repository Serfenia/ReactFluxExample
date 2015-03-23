import React from 'react';
import _     from 'lodash';

/** Actions */
import Dispatcher from './../../dispatcher/Dispatcher.js';

const inputStyle = {
  width: '40%',
  marginRight: 5
};

class TodoForm extends React.Component {
  constructor(props) {
    this.state = props.todo;
  }
  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    })
  }
  handleAssignedChange(event) {
    this.setState({
      title: event.target.value
    })
  }
  saveTodo(event) {
    event.preventDefault();
    Dispatcher.updateTodo(this.state);
    this.props.showTodo();
  }
  render() {
    return (
      <form className="form-inline" onSubmit={this.saveTodo.bind(this)}>
        <input className="form-control" style={inputStyle} type="text" defaultValue={this.props.todo.title} value={this.state.title} onChange={this.handleTitleChange.bind(this)} />
        <input className="form-control" style={inputStyle} type="text" defaultValue={this.props.todo.assignedTo} value={this.state.assignedTo} onChange={this.handleAssignedChange.bind(this)} />
        <button className="btn btn-primary form-control">Save</button>
      </form>
    );
  }
}

export default TodoForm;