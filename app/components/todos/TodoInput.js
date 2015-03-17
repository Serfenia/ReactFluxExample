import React from 'react';

class TodoInput extends React.Component {
  updateValue(event) {
    this.props.handleChange({
      property: this.props.property,
      value: event.target.value
    });
  }
  clear() {
    this.refs[this.props.property].getDOMNode().value = '';
  }
  render() {
    return (
      <div>
        <label htmlFor="input">{this.props.title}</label>
        <input required="true" id="input" className="form-control" ref={this.props.property} type="text" onChange={this.updateValue.bind(this)} />
      </div>
    );
  }
}

export default TodoInput;