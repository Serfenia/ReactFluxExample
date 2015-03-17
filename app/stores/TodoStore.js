import Flux from 'flux-react';

/** Dispatcher */
import Dispatcher from './../dispatcher/Dispatcher.js';

var TodoStore = Flux.createStore({
  todos: localStorage['todos'] ? JSON.parse(localStorage['todos']) : {},
  index: localStorage['index'] ? localStorage.getItem('index') : 0,
  actions: [
    Dispatcher.addTodo,
    Dispatcher.updateTodo,
    Dispatcher.removeTodo
  ],
  addTodo: function (todo) {
    todo.id = this.index;
    this.todos[this.index] = todo;
    this.emitChange();
    this.index++;
    localStorage.setItem('index', this.index);
  },
  updateTodo: function(todo) {
    this.todos[todo.id] = todo;
    this.emitChange();
  },
  removeTodo: function(todo) {
    delete this.todos[todo.id];
    this.emitChange();
  },
  exports: {
    getTodos: function () {
      return this.todos;
    }
  }
});

export default TodoStore;