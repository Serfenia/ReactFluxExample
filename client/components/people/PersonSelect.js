import React from 'react';
import _ from 'lodash';

/** Stores */
import PeopleStore from "./../../stores/PeopleStore.js";

var people = PeopleStore.getPeople();
var options = [];
_.each(people, function(person) {
  options.push(<option key={person.id} value={person.name}>{person.name}</option>);
});

class PersonSelect extends React.Component {
  updateValue(event) {
    this.props.handleChange({
      property: this.props.property,
      value: event.target.value
    });
  }
  setInitialValue() {
    this.props.handleChange({
      property: this.props.property,
      value: _.first(people).name
    });
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.value == '')
      this.setInitialValue()
  }
  componentDidMount() {
    this.setInitialValue()
  }
  render() {
    return (
      <div>
        <label htmlFor="select">{this.props.title}</label>
        <select required="true" id="input" className="form-control" defaultValue={_.first(people).name} value={this.props.value} onChange={this.updateValue.bind(this)}>
          {options}
        </select>
      </div>
    );
  }
}

export default PersonSelect;