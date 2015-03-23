import React from 'react';

/** Dispatcher */
import Dispatcher from './../../dispatcher/Dispatcher.js';

/** Components */
import TodoUpdateForm from './TodoUpdateForm.js';

const style = {
  buttonColumn: {
    width: '1%',
    whiteSpace: 'nowrap'
  }
};

class TodoItem extends React.Component {
  constructor() {
    this.state = {
      toggled: false,
      editable: false
    };
  }
  toggleTodo(event) {
    event.preventDefault();
    this.setState({
      toggled: !this.state.toggled
    });
  }
  handleShowTodo() {
    this.setState({
      editable: false
    });
  }
  editTodo() {
    this.setState({
      editable: true
    });
  }
  removeTodo() {
    Dispatcher.removeTodo(this.props.todo);
  }

  render() {
    const toggledContent = this.state.toggled ?
      <span>
        <strong>Assigned to: </strong>{this.props.todo.assignedTo} <br />
        <strong>Subtask of: </strong>{this.props.todo.subtaskOf} <br />
      </span>
      : '';
    const rowClass = this.props.todo.isImportant ? 'danger' : '';

    if(this.state.editable) {
      return (
        <tr>
          <td colSpan="3">
            <TodoUpdateForm todo={this.props.todo} showTodo={this.handleShowTodo.bind(this)} />
          </td>
        </tr>
      )
    } else {
      return (
        <tr className={rowClass}>
          <td onClick={this.toggleTodo.bind(this)}>
            {this.props.todo.title}<br />{toggledContent}
          </td>
          <td style={style.buttonColumn}>
            <button onClick={this.editTodo.bind(this)} className="btn btn-default">Edit</button>
          </td>
          <td style={style.buttonColumn}>
            <button onClick={this.removeTodo.bind(this)} className="btn btn-danger">Delete</button>
          </td>
        </tr>
      )
    }
  }
}

export default TodoItem;