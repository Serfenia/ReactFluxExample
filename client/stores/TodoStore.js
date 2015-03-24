import Flux from 'flux-react';
import _ from 'lodash';

/** Dispatcher */
import Dispatcher from './../dispatcher/Dispatcher.js';

var localStorage = window.localStorage;

var TodoStore = Flux.createStore({
  todos: {},
  index: 0,
  actions: [
    Dispatcher.addTodo,
    Dispatcher.updateTodo,
    Dispatcher.removeTodo,
    Dispatcher.clearTodos
  ],
  addTodo: function (todo) {
    todo.id = this.index;
    if(todo.subtaskOf === 'none') {
      todo.subtaskOf = null;
    }
    this.todos[this.index] = todo;
    this.emitChange();
    this.index++;
  },
  updateTodo: function(todo) {
    this.todos[todo.id] = todo;
    this.emitChange();
  },
  removeTodo: function(todo) {
    delete this.todos[todo.id];
    _.each(Object.keys(this.todos), (key) => {
      var possibleSubTodo = this.todos[this.todos[key].id];
      if(possibleSubTodo.subtaskOf === todo.title) {
        delete this.todos[possibleSubTodo.id];
      }
    });
    this.emitChange();
  },
  clearTodos: function() {
    this.todos = {};
    this.emitChange();
  },
  exports: {
    getCurrentIndex: function() {
      return this.index <= 0 ? 0 : this.index - 1;
    },
    getTodo: function(id) {
      return this.todos[id]
    },
    getTodos: function () {
      return this.todos;
    },
    getTodosByPerson: function(personName) {
      var keys = Object.keys(this.todos);
      var personTodos = {};
      _.each(keys, (key) => {

        if(this.todos[key].assignedTo === personName) {
          personTodos[key] = this.todos[key];
        }
      });
      return personTodos;
    }
  }
});

export default TodoStore;