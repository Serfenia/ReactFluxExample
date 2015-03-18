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
    console.log(event.target.value);
    this.props.handleChange({
      property: this.props.property,
      value: event.target.value
    });
  }
  clear() {
    this.refs[this.props.property].getDOMNode().value = _.first(people).name;
  }
  componentWillMount() {
    this.props.handleChange({
      property: this.props.property,
      value: _.first(people).name
    });
  }
  render() {
    return (
      <div>
        <label htmlFor="select">{this.props.title}</label>
        <select required="true" id="input" className="form-control" ref={this.props.property} onChange={this.updateValue.bind(this)}>
          {options}
        </select>
      </div>
    );
  }
}

export default PersonSelect;