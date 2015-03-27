import React from 'react';
import _     from 'lodash';

/** Dispatcher */
import Dispatcher from './../../dispatcher/Dispatcher.js';
/** Store */
import TodoStore from './../../stores/TodoStore.js';

/** Components */
import TodoItem from './TodoItem.js';

const style = {
  containerStyle: {
    marginLeft: '2%',
    width: '48%',
    float: 'left',
    height: 360,
    overflowY: "scroll"
  },
  headerStyle: {
    width: '50%',
    float: 'left',
    height: 50,
    lineHeight: '1.1'
  },
  clearStyle: {
    width: '49%',
    float: 'left',
    height: 50,
    lineHeight: '100px',
    textAlign: 'right'
  }
};

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
  clearTodos(event) {
  event.preventDefault();
  Dispatcher.clearTodos();
}
  changeState() {
    var todos = TodoStore.getTodos();
    this.setState({
      todos: todos
    });
  }
  renderTodo(todo){
    return (
      <TodoItem key={todo.id} todo={todo} />
    )
  }
  render() {
    var noTodos = _.isEmpty(this.state.todos) ? <tr><td>No todo's</td></tr> : undefined;
    return (
      <div style={style.containerStyle}>
        <h1 style={style.headerStyle}>All Todo's</h1>
        <a style={style.clearStyle} href="#" onClick={this.clearTodos.bind(this)}>Clear todo's</a>
        <table className="table table-hover" >
          <tbody>
            {noTodos}
            {_.map(this.state.todos, this.renderTodo.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default TodoTable;