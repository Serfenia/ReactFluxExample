import React from 'react';

class TodoCheckbox extends React.Component {
  updateValue(event) {
    this.props.handleChange({
      property: this.props.property,
      value: event.target.checked
    });
  }
  render() {
    return (
      <div>
        <input id="input" type="checkbox" checked={this.props.value} onChange={this.updateValue.bind(this)} />{this.props.title}
      </div>
    );
  }
}

export default TodoCheckbox;