import React from 'react';
import _     from 'lodash';

/** Dispatcher */
import Dispatcher from './../../dispatcher/Dispatcher.js';

/** Components */
import TodoInput from './TodoInput.js';
import TodoCheckbox from './TodoCheckbox.js';

import PersonSelect from './../people/PersonSelect.js';
import TodoSelect from './../todos/TodoSelect.js';


class TodoForm extends React.Component {
  constructor() {
    this.state = {
      title: '',
      assignedTo: '',
      subtaskOf: null,
      isImportant: false
    }
  }
  updateTodo(obj) {
    var newState = {};
    newState[obj.property] = obj.value;
    this.setState(newState)
  }
  clearForm() {
    _.each(this.refs, (ref) => {
      ref.clear();
    });
  }
  addTodo(event) {
    event.preventDefault();
    console.log(this.state);
    Dispatcher.addTodo(this.state);
    this.clearForm()
  }
  render() {
    return (
      <form className="form well" onSubmit={this.addTodo.bind(this)}>
        <h3>Add a todo</h3>
        <TodoInput title="Title" property="title" ref="title" type="text" handleChange={this.updateTodo.bind(this)} />
        <PersonSelect title="Assign to" property="assignedTo" ref="assigendTo" type="text" handleChange={this.updateTodo.bind(this)} />
        <TodoSelect title="Subtask of" property="subtaskOf" ref="subtaskOf" handleChange={this.updateTodo.bind(this)} />
        <TodoCheckbox title="Important?" property="isImportant" person={this.state.assignedTo} ref="isImportant" type="checkbox" handleChange={this.updateTodo.bind(this)} />
        <br />
        <button className="btn btn-primary form-control offset1">Add</button>
      </form>
    );
  }
}

export default TodoForm;