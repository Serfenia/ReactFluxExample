(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./specs/App-spec.js":[function(require,module,exports){
var App = require('./../app/App.js');
var TestUtils = require('react-addons').TestUtils;

describe("App", function() {

  it("should be wrapped with a div", function() {
    var app = TestUtils.renderIntoDocument(App());
    expect(app.getDOMNode().tagName).toEqual('DIV');
  });

});
},{"./../app/App.js":"/Users/patvuure/WebstormProjects/ReactFluxExample/app/App.js","react-addons":"react-addons"}],"/Users/patvuure/WebstormProjects/ReactFluxExample/app/App.js":[function(require,module,exports){
import React from 'react';

/** Components */
import TodoTable from './components/todos/TodoTable.js';
import TodoForm from './components/todos/TodoForm.js';

/** Styles */
const containerStyle = {width: 400};

class App extends React.Component {
	render() {
    return (
      React.createElement("div", {className: "center-block top15", style: containerStyle}, 
        React.createElement(TodoForm, null), 

        React.createElement("h1", null, "Todo's"), 
        React.createElement(TodoTable, null)
      )
    );
  }
}
	
export default App;

},{}]},{},["./specs/App-spec.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcGVjcy9BcHAtc3BlYy5qcyIsImFwcC9BcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXBwID0gcmVxdWlyZSgnLi8uLi9hcHAvQXBwLmpzJyk7XG52YXIgVGVzdFV0aWxzID0gcmVxdWlyZSgncmVhY3QtYWRkb25zJykuVGVzdFV0aWxzO1xuXG5kZXNjcmliZShcIkFwcFwiLCBmdW5jdGlvbigpIHtcblxuICBpdChcInNob3VsZCBiZSB3cmFwcGVkIHdpdGggYSBkaXZcIiwgZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFwcCA9IFRlc3RVdGlscy5yZW5kZXJJbnRvRG9jdW1lbnQoQXBwKCkpO1xuICAgIGV4cGVjdChhcHAuZ2V0RE9NTm9kZSgpLnRhZ05hbWUpLnRvRXF1YWwoJ0RJVicpO1xuICB9KTtcblxufSk7IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuLyoqIENvbXBvbmVudHMgKi9cbmltcG9ydCBUb2RvVGFibGUgZnJvbSAnLi9jb21wb25lbnRzL3RvZG9zL1RvZG9UYWJsZS5qcyc7XG5pbXBvcnQgVG9kb0Zvcm0gZnJvbSAnLi9jb21wb25lbnRzL3RvZG9zL1RvZG9Gb3JtLmpzJztcblxuLyoqIFN0eWxlcyAqL1xuY29uc3QgY29udGFpbmVyU3R5bGUgPSB7d2lkdGg6IDQwMH07XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cdHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7Y2xhc3NOYW1lOiBcImNlbnRlci1ibG9jayB0b3AxNVwiLCBzdHlsZTogY29udGFpbmVyU3R5bGV9LCBcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChUb2RvRm9ybSwgbnVsbCksIFxuXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJoMVwiLCBudWxsLCBcIlRvZG8nc1wiKSwgXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoVG9kb1RhYmxlLCBudWxsKVxuICAgICAgKVxuICAgICk7XG4gIH1cbn1cblx0XG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0=
