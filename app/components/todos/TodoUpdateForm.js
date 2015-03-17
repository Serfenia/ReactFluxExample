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
  updateTodo() {
    this.setState({
      title: this.refs.title.getDOMNode().value,
      assignedTo: this.refs.assignedTo.getDOMNode().value
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
        <input className="form-control" style={inputStyle} ref="title" type="text" defaultValue={this.props.todo.title} onChange={this.updateTodo.bind(this)} />
        <input className="form-control" style={inputStyle} ref="assignedTo" type="text" defaultValue={this.props.todo.assignedTo} onChange={this.updateTodo.bind(this)} />
        <button className="btn btn-primary form-control">Save</button>
      </form>
    );
  }
}

export default TodoForm;