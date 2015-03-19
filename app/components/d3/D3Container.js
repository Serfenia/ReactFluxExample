import React from 'react';
import d3    from 'd3';
import _     from 'lodash';

/** Stores */
import PeopleStore from './../../stores/PeopleStore.js';
import TodoStore from './../../stores/TodoStore.js';

const selectStyle = {
  width: 400
};

class D3Container extends React.Component {
  constructor() {
    this.state = {
      nodes: [],
      links: [],
      selectedPerson: _.first(PeopleStore.getPeople()).name
    }
  }
  changePerson(event) {
    console.log(event.target.value);
    this.setState({
      selectedPerson: event.target.value
    });
    this.changeVisualization(event.target.value);
  }
  changeVisualization(person) {
    var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("a simple tooltip");

    var svg = d3.select('svg');
    svg.selectAll('*').remove();

    if(!person) {
      person = this.state.selectedPerson
    }

    var color = d3.scale.category20();
    var nodes = [{label:person, weight:4, group: 1}];
    var links = [];

    var todos = TodoStore.getTodos();
    _.each(todos, (todo) => {
      console.log(person);
      if(todo.assignedTo === person) {
        
        nodes.push({
          label: todo.title,
          weight: 1,
          group: todo.subtaskOf ? 3 : 2
        });

        if(!todo.subtaskOf) {
          links.push({
            source: 0,
            target: nodes.length-1,
            weight: 1
          });
        }

        if(todo.subtaskOf) {
          var keys = Object.keys(todos);
          for(var i = 0; i < keys.length; i++) {
            if(todo.subtaskOf === todos[keys[i]].title) {
              var obj = {
                source: links[links.length-1].target,
                target: (function(todo) {
                  var index = -1;
                  _.each(nodes, (node) => {
                    if(node.label === todo.title) {
                      index = nodes.indexOf(node);
                    }
                  });
                  return index;
                })(todos[keys[i]]),
                weight: 1
              };
              console.log(obj);
              links.push(obj);
            }
          }
        }
      }
    });

    var force = d3.layout.force()
      .nodes(nodes)
      .links(links)
      .charge(-120)
      .linkDistance(100)
      .size([400, 600]);

    force.start();

    var link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke", "black")
      .style("stroke-width", "1");

    var node = svg.selectAll(".node")
      .data(nodes)
      .enter().append("circle")
      .attr("class", "node")
      .attr("r", 12)
      .style("fill", function(d) { return color(d.group); })
      .on("mouseover", function(d){
        tooltip.text(d.label);
        return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){return tooltip.style("top",
        (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");})
      .call(force.drag);

    node.append("title")
      .text(function(d) { return d.name; });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    });
    this.setState({
      nodes,
      links
    })
  }
  componentDidMount() {
    TodoStore.addChangeListener(this.changeVisualization.bind(this));
    this.changeVisualization(this.state.selectedPerson);
  }

  render() {
    var options = [];

    _.each(PeopleStore.getPeople(), function(person) {
      options.push(<option key={person.id} value={person.name}>{person.name}</option>);
    });

    return (
      <div>
        <h4>Select a person to change the visualization</h4>
        <select className="form-control" style={selectStyle} onChange={this.changePerson.bind(this)}>
          {options}
        </select>
        <svg width="400" height="600" ref="svg">
        </svg>
      </div>
    );
  }
}

export default D3Container;
