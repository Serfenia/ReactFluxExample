import React from 'react';
import _     from 'lodash';

/** Store */
import TodoStore from './../../stores/TodoStore.js';

/** Components */
import TodoItem from './TodoItem.js';

class TodoTable extends React.Component {
  constructor() {
    this.state = {
      todos: TodoStore.getTodos()
    };
  }
  componentWillMount() {
    TodoStore.addChangeListener(this.changeState.bind(this));
  }
  componentWillUnmount() {
    TodoStore.removeChangeListener(this.changeState.bind(this));
  }
  changeState(){
    var todos = TodoStore.getTodos();
    this.setState({
      todos: todos
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  renderTodo(todo){
    return (
      <TodoItem key={todo.id} todo={todo} />
    )
  }
  render() {
    var noTodos = _.isEmpty(this.state.todos) ? <tr><td>No todo's</td></tr> : undefined;
    return (
      <table className="table table-hover">
        <tbody>
          {noTodos}
          {_.map(this.state.todos, this.renderTodo.bind(this))}
        </tbody>
      </table>
    )
  }
}

export default TodoTable;