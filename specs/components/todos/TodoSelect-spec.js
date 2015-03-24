import _ from 'lodash';

var TodoSelect = require('./../../../client/components/todos/TodoSelect.js');

var Dispatcher = require('./../../../client/dispatcher/Dispatcher.js');

var TodoStore = require('./../../../client/stores/TodoStore.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe("TodoSelect", function() {
  var todoSelect;

  var objectThatActsAsParent = {
    state: {},
    handleChange: function(obj) {
      this.state[obj.property] = obj.value;
    }
  };
  var mockTodo = {
    title: "Task 1",
    assignedTo: 'Patrick van Vuuren',
    subtaskOf: 'none',
    isImportant: false
  };

  beforeEach(() => {
    Dispatcher.addTodo(mockTodo);

    todoSelect = TestUtils.renderIntoDocument(<TodoSelect title="Subtask of" property="subtaskOf" person={'none'} value={''} handleChange={objectThatActsAsParent.handleChange.bind(objectThatActsAsParent)} />);
    todoSelect.componentWillReceiveProps({
      person: ''
    });
  });

  it('should render the select box component in a div', () => {
    expect(React.findDOMNode(todoSelect).tagName).toEqual('DIV')
  });

  it('should have set the title in the label according to the title value in props', () => {
    expect(React.findDOMNode(todoSelect).firstChild.innerText).toEqual(todoSelect.props.title)
  });

  it('should have loaded no todos into the state according to the person Robin ter Horst', () => {
    todoSelect.componentWillReceiveProps({
      person: 'Robin ter Horst'
    });

    expect(Object.keys(todoSelect.state.todos).length).toEqual(0);
  });

  it('should have loaded one todo into the state according to the person Patrick van Vuuren', () => {
    todoSelect.componentWillReceiveProps({
      person: 'Patrick van Vuuren'
    });

    expect(todoSelect.state.todos[TodoStore.getCurrentIndex()].title).toEqual(mockTodo.title);
  });

  it('should have added one option to the select box if there is one todo in the state', () => {
    todoSelect.componentWillReceiveProps({
      person: 'Patrick van Vuuren'
    });
    expect(React.findDOMNode(todoSelect).children.length).toEqual(2); // 'Choose..' option is also present
    expect(React.findDOMNode(todoSelect).children[1].children[1].value).toEqual(todoSelect.state.todos[TodoStore.getCurrentIndex()].title); // 'Choose..' option is also present
  });

  it('should have called the handleChange function when the value of the select box changes', () => {
    expect(objectThatActsAsParent.state.hasOwnProperty(todoSelect.props.property)).toEqual(false);
    TestUtils.Simulate.change(React.findDOMNode(todoSelect).children[1], {target: {value: 'Task 1'}});
    expect(objectThatActsAsParent.state.hasOwnProperty(todoSelect.props.property)).toEqual(true);
    expect(objectThatActsAsParent.state[todoSelect.props.property]).toEqual('Task 1');
  });

  afterEach(() => {
    todoSelect = null;
    Dispatcher.clearTodos();
  });
});
