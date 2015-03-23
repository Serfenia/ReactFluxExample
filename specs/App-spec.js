import _ from 'lodash';

var App = require('././App.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe("App", function() {
  var app;

  beforeEach(() => {
    app = TestUtils.renderIntoDocument(<App />);
  });

  it("should be wrapped with a div", () => {
    expect(React.findDOMNode(app).tagName).toEqual('DIV');
  });

  it('should have set the styles of the container and sub containers', () => {
    expect(React.findDOMNode(app).style.width).toEqual('860px');

    var children = React.findDOMNode(app).children;
    _.each(children, (child) => {
      expect(child.style.width).toEqual('860px');
      expect(child.style.float).toEqual('left');
      expect(child.style.height).toEqual('400px');
    });
  });

  afterEach(() => {
    app = null;
  });
});
