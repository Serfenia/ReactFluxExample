import React from 'react';
import _ from 'lodash';

/** Stores */
import TodoStore from "./../../stores/TodoStore.js";

class TodoSelect extends React.Component {
  constructor() {
    this.state = {
      todos: (TodoStore.getTodos() || {})
    }
  }
  updateValue(event) {
    this.props.handleChange({
      property: this.props.property,
      value: event.target.value
    });
  }
  clear() {
    this.refs[this.props.property].getDOMNode().value = this.state.todos[Object.keys(this.state.todos)[0]].title
  }
  changeState(){
    var todos = TodoStore.getTodos();
    this.setState({
      todos: todos
    });
  }
  componentWillMount() {
    TodoStore.addChangeListener(this.changeState.bind(this));
    if(!_.isEmpty(this.state.todos))
      this.props.handleChange({
        property: this.props.property,
        value: this.state.todos[Object.keys(this.state.todos)[0]].title
      });
  }
  render() {
    var options = [];
    _.each(this.state.todos, function(todo) {
      options.push(<option key={todo.id} value={todo.title}>{todo.title}</option>);
    });
    return (
      <div>
        <label htmlFor="select">{this.props.title}</label>
        <select id="input" className="form-control" ref={this.props.property} onChange={this.updateValue.bind(this)}>
          {options}
        </select>
      </div>
    );
  }
}

export default TodoSelect;