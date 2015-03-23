import _ from 'lodash';

var TodoInput = require('./../.././components/todos/TodoInput.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe("TodoInput", function() {
  var todoInput;

  var objectThatActsAsParent = {
    state: {},
    handleChange: function(obj) {
      this.state[obj.property] = obj.value;
    }
  };

  beforeEach(() => {
    todoInput = TestUtils.renderIntoDocument(<TodoInput title="Title" property="title" type="text" value={''} handleChange={objectThatActsAsParent.handleChange.bind(objectThatActsAsParent)} />);
  });

  it('should render the input component in a div', () => {
    expect(React.findDOMNode(todoInput).tagName).toEqual('DIV')
  });

  it('should have set the title in the label according to the title value in props', () => {
    expect(React.findDOMNode(todoInput).firstChild.innerText).toEqual(todoInput.props.title)
  });

  it('should have set the placeholder of the input according to the title value in props', () => {
    expect(React.findDOMNode(todoInput).children[1].placeholder).toEqual(todoInput.props.title)
  });

  it('should have set the value of the input according to the value in props', () => {
    expect(React.findDOMNode(todoInput).children[1].value).toEqual(todoInput.props.value)
  });

  it('should have called the handleChange function when the value of the input changes', () => {
    expect(objectThatActsAsParent.state.hasOwnProperty(todoInput.props.property)).toEqual(false);
    TestUtils.Simulate.change(React.findDOMNode(todoInput).children[1], {target: {value: 'Test'}});
    expect(objectThatActsAsParent.state.hasOwnProperty(todoInput.props.property)).toEqual(true);
    expect(objectThatActsAsParent.state[todoInput.props.property]).toEqual('Test');
  });

  afterEach(() => {
    todoInput = null;
  });
});
