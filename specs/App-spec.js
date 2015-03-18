var App = require('./../app/App.js');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

describe("App", function() {

  it("should be wrapped with a div", function() {
    var instance = <App />;
    var app = TestUtils.renderIntoDocument(instance);
    expect(app).toEqual('div');
  });
});