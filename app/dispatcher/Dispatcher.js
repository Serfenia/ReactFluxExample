import Flux from 'flux-react';

var Dispatcher = Flux.createActions([
  'addTodo',
  'updateTodo',
  'removeTodo',
  'clearTodos'
]);

export default Dispatcher;