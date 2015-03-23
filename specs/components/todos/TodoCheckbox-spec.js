import _ from 'lodash';

var TodoCheckbox = require('./../.././components/todos/TodoCheckbox.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe("TodoCheckbox", function() {
  var todoCheckbox;

  var objectThatActsAsParent = {
    state: {},
    handleChange: function(obj) {
      this.state[obj.property] = obj.value;
    }
  };

  beforeEach(() => {
    todoCheckbox = TestUtils.renderIntoDocument(<TodoCheckbox title="Important?" property="isImportant" type="checkbox" value={false} handleChange={objectThatActsAsParent.handleChange.bind(objectThatActsAsParent)} />);
  });

  it('should render the checkbox component in a div', () => {
    expect(React.findDOMNode(todoCheckbox).tagName).toEqual('DIV')
  });


  it('should have set the checked of the input according to the value in props', () => {
    expect(React.findDOMNode(todoCheckbox).children[0].checked).toEqual(todoCheckbox.props.value);
  });

  it('should have set the label of the input according to the title value in props', () => {
    expect(React.findDOMNode(todoCheckbox).children[1].innerText).toEqual(todoCheckbox.props.title);
  });

  it('should have called the handleChange function when the value of the input changes', () => {
    expect(objectThatActsAsParent.state.hasOwnProperty(todoCheckbox.props.property)).toEqual(false);
    TestUtils.Simulate.change(React.findDOMNode(todoCheckbox).children[0], {target: {checked: true}});
    expect(objectThatActsAsParent.state.hasOwnProperty(todoCheckbox.props.property)).toEqual(true);
    expect(objectThatActsAsParent.state[todoCheckbox.props.property]).toEqual(true);
  });

  afterEach(() => {
    todoCheckbox = null;
  });
});
