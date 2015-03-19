import React from 'react';
import _     from 'lodash';

/** Dispatcher */
import Dispatcher from './../../dispatcher/Dispatcher.js';

/** Components */
import TodoInput from './TodoInput.js';
import TodoCheckbox from './TodoCheckbox.js';

import PersonSelect from './../people/PersonSelect.js';
import TodoSelect from './../todos/TodoSelect.js';

const style = {
  formStyle: {
    width: 400,
    height: 360,
    float: 'left',
    position: 'relative'
  },
  buttonStyle: {
    bottom: 0,
    position: 'absolute'
  }
};

const initialState = {
  title: '',
  assignedTo: '',
  subtaskOf: 'none',
  isImportant: false
}

class TodoForm extends React.Component {
  constructor() {
    this.state = initialState
  }
  updateTodo(obj) {
    var newState = {};
    newState[obj.property] = obj.value;
    this.setState(newState);
  }
  clearForm() {
    this.setState(initialState);
  }
  addTodo(event) {
    event.preventDefault();
    console.log(this.state);
    Dispatcher.addTodo(this.state);
    this.clearForm()
  }
  render() {
    return (
      <form className="form" style={style.formStyle} onSubmit={this.addTodo.bind(this)}>
        <h1>Add a todo</h1>
        <TodoInput title="Title" property="title" type="text" value={this.state.title} handleChange={this.updateTodo.bind(this)} />
        <PersonSelect title="Assign to" property="assignedTo" type="text" value={this.state.assignedTo} handleChange={this.updateTodo.bind(this)} />
        <TodoSelect title="Subtask of" property="subtaskOf" person={this.state.assignedTo} value={this.state.subtaskOf} handleChange={this.updateTodo.bind(this)} />
        <TodoCheckbox title="Important?" property="isImportant" ref="isImportant" type="checkbox" handleChange={this.updateTodo.bind(this)} />
        <br />
        <button className="btn btn-primary form-control offset1" style={style.buttonStyle}>Add</button>
      </form>
    );
  }
}

export default TodoForm;