import React from 'react';

class TodoCheckbox extends React.Component {
  updateValue(event) {
    this.props.handleChange({
      property: this.props.property,
      value: event.target.checked
    });
  }
  clear() {
    this.refs[this.props.property].getDOMNode().checked = false;
  }
  render() {
    return (
      <div>
        <input id="input" ref={this.props.property} type="checkbox" onChange={this.updateValue.bind(this)} /> {this.props.title}
      </div>
    );
  }
}

export default TodoCheckbox;
