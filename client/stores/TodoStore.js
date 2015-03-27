import Flux from 'flux-react';
import _ from 'lodash';

/** Dispatcher */
import Dispatcher from './../dispatcher/Dispatcher.js';

var localStorage = window.localStorage;

var TodoStore = Flux.createStore({
  todos: localStorage && localStorage["todos"] ?  localStorage["todos"] : {"0":{"title":"dasf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":0},"1":{"title":"dasf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":1},"2":{"title":"dsaf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":2},"3":{"title":"dsfa","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":3},"4":{"title":"sdfa","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":4},"5":{"title":"sdaf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":5},"6":{"title":"asdf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":6},"7":{"title":"asdf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":7},"8":{"title":"dsfa","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":8},"9":{"title":"dsfsd","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":9},"10":{"title":"afsda","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":10},"11":{"title":"fdsa","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":11},"12":{"title":"dsaf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":12},"13":{"title":"sda","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":13},"14":{"title":"f","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":14},"15":{"title":"sadf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":15},"16":{"title":"sadf","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":16},"17":{"title":"dsa","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":17},"18":{"title":"f","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":18},"19":{"title":"das","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":19},"20":{"title":"fdfs","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":20},"21":{"title":"d","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":21},"22":{"title":"d","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":22},"23":{"title":"sd","assignedTo":"Patrick van Vuuren","subtaskOf":"dasf","isImportant":false,"id":23},"24":{"title":"sdaf","assignedTo":"Patrick van Vuuren","subtaskOf":"dasf","isImportant":false,"id":24},"25":{"title":"sadfdsaf","assignedTo":"Patrick van Vuuren","subtaskOf":"dasf","isImportant":false,"id":25},"26":{"title":"asdf","assignedTo":"Patrick van Vuuren","subtaskOf":"sadfdsaf","isImportant":false,"id":26},"27":{"title":"sadfsa","assignedTo":"Patrick van Vuuren","subtaskOf":"sadfdsaf","isImportant":false,"id":27},"28":{"title":"dsafas","assignedTo":"Patrick van Vuuren","subtaskOf":"sadfdsaf","isImportant":false,"id":28},"29":{"title":"sdaf","assignedTo":"Patrick van Vuuren","subtaskOf":"sd","isImportant":false,"id":29},"30":{"title":"sdafads","assignedTo":"Patrick van Vuuren","subtaskOf":"sdaf","isImportant":false,"id":30},"31":{"title":"sadfas","assignedTo":"Patrick van Vuuren","subtaskOf":"sadfdsaf","isImportant":false,"id":31},"32":{"title":"adfs","assignedTo":"Patrick van Vuuren","subtaskOf":"sdfa","isImportant":false,"id":32},"33":{"title":"ighjkgfh","assignedTo":"Patrick van Vuuren","subtaskOf":"dsaf","isImportant":false,"id":33},"34":{"title":"gkfkh","assignedTo":"Patrick van Vuuren","subtaskOf":"asdf","isImportant":false,"id":34},"35":{"title":"ghfkgf","assignedTo":"Patrick van Vuuren","subtaskOf":"sdaf","isImportant":false,"id":35},"36":{"title":"sdaf","assignedTo":"Patrick van Vuuren","subtaskOf":"sdfa","isImportant":false,"id":36},"37":{"title":"gfh","assignedTo":"Patrick van Vuuren","subtaskOf":null,"isImportant":false,"id":37}},
  index: 0,
  actions: [
    Dispatcher.addTodo,
    Dispatcher.updateTodo,
    Dispatcher.removeTodo,
    Dispatcher.clearTodos
  ],
  addTodo: function (todo) {
    todo.id = this.index;
    if (todo.subtaskOf === 'none') {
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