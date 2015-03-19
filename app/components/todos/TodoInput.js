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
        <input required="true" id="input" className="form-control" placeholder={this.props.title} value={this.props.value} type="text" onChange={this.updateValue.bind(this)} />
      </div>
    );
  }
}

export default TodoInput;