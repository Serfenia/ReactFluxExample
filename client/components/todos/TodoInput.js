import React from 'react';

class TodoInput extends React.Component {
  updateValue(event) {
    this.props.handleChange({
      property: this.props.property,
      value: event.target.value
    });
  }
  render() {
    return (
      <div>
        <label htmlFor="input">{this.props.title}</label>
        <input required="true" type="text" className="form-control" placeholder={this.props.title} value={this.props.value} onChange={this.updateValue.bind(this)} />
      </div>
    );
  }
}

export default TodoInput;