import _ from 'lodash';

var TodoItem = require('./../.././components/todos/TodoItem.js');

var Dispatcher = require('./../.././dispatcher/Dispatcher.js');

var TodoStore = require('./../.././stores/TodoStore.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe("TodoItem", function() {
  var table, todoItem;

  var objectThatActsAsParent = {

  };

  var mockTodo = {
    title: "Task 1",
    assignedTo: 'Patrick van Vuuren',
    subtaskOf: 'none',
    isImportant: true
  };

  Dispatcher.clearTodos();

  beforeEach(() => {
    Dispatcher.addTodo(mockTodo);
    var todo = TodoStore.getTodos()[TodoStore.getCurrentIndex()];

    todoItem = <TodoItem key={todo.id} todo={todo} />;
    table = TestUtils.renderIntoDocument(<table><tbody>{todoItem}</tbody></table>);
  });

  it('should render the todo item in a table row in a table', () => {
    expect(React.findDOMNode(table).tagName).toEqual('TABLE');
    expect(table.props.children.type).toEqual('tbody');
    expect(todoItem.__proto__._isReactElement).toEqual(true);
  });

  it('should toggle the todo if the table cell of the todo\'s title is clicked', () => {
    var firstTd = React.findDOMNode(table).firstChild.firstChild.firstChild;
    expect(firstTd.children[2].innerText).toEqual("");
    TestUtils.Simulate.click(firstTd);
    expect(firstTd.children[2].innerText).not.toEqual("");
  });

  it('should open the edit form for the todo if the edit button in the table row is clicked', () => {
    var tableRow = React.findDOMNode(table).firstChild.firstChild;
    var secondTd = React.findDOMNode(table).firstChild.firstChild.children[1];
    expect(secondTd.firstChild.tagName).toEqual("BUTTON");
    expect(tableRow.children.length).toEqual(3);

    TestUtils.Simulate.click(secondTd.firstChild);

    expect(tableRow.children.length).toEqual(1);
    expect(tableRow.firstChild.firstChild.tagName).toEqual('FORM');
  });

  it('should delete the todo if the delete button in the table row is clicked', () => {
    var thirdTd = React.findDOMNode(table).firstChild.firstChild.children[2];
    expect(thirdTd.firstChild.tagName).toEqual("BUTTON");
    expect(Object.keys(TodoStore.getTodos()).length).toEqual(1);

    TestUtils.Simulate.click(thirdTd.firstChild);

    expect(Object.keys(TodoStore.getTodos()).length).toEqual(0);
  });

  it('should highlight an important todo', () => {
    expect(React.findDOMNode(table).firstChild.firstChild.className).toEqual('danger');
  });

  afterEach(() => {
    todoItem = null;
    Dispatcher.clearTodos()
  });
});
