import React from 'react';
import _ from 'lodash';

/** Stores */
import TodoStore from "./../../stores/TodoStore.js";

class TodoSelect extends React.Component {
  constructor() {
    this.state = { todos: {} };
  }
  updateValue(event) {
    this.props.handleChange({
      property: this.props.property,
      value: event.target.value
    });
  }
  clear() {
    this.refs[this.props.property].getDOMNode().value = 'none';
    this.changeState();
  }
  changeState(){
    var todos = TodoStore.getTodosByPerson(this.props.person);
    this.setState({
      todos: todos
    });
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.person !== nextProps.person) {
      this.setState({
        todos: (TodoStore.getTodosByPerson(nextProps.person) || {})
      });
    }
  }
  componentWillMount() {
    TodoStore.addChangeListener(this.changeState.bind(this));
    if(!_.isEmpty(this.state.todos))
      this.props.handleChange({
        property: this.props.property,
        value: 'none'
      });
  }
  render() {
    var options = [<option key={-1} value="none">Choose..</option>];
    _.each(this.state.todos, function(todo) {
      options.push(<option key={todo.id} value={todo.title}>{todo.title}</option>);
    });
    return (
      <div>
        <label htmlFor="select">{this.props.title}</label>
        <select id="input" className="form-control" ref={this.props.property} value={this.props.subtaskOf} onChange={this.updateValue.bind(this)}>
          {options}
        </select>
      </div>
    );
  }
}

export default TodoSelect;