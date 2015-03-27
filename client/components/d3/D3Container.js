import React from 'react';
import d3    from 'd3';
import _     from 'lodash';

/** Stores */
import PeopleStore from './../../stores/PeopleStore.js';
import TodoStore from './../../stores/TodoStore.js';

/** Dispatcher */
import Dispatcher from './../../dispatcher/Dispatcher.js';

var style = {
  popUpStyle: {
    backgroundColor: '#ccc',
    width: 'auto',
    position: 'absolute',
    color: 'black',
    fontSize: '14px',
    lineHeight: '20px',
    height: '20px',
    fontWeight: 'bold',
    border: '1px solid black',
    borderRadius: '5px',
    left: 0
  }
};

const color = d3.scale.category20();

var options = [];

_.each(PeopleStore.getPeople(), function(person) {
  options.push(<option key={person.id} value={person.name}>{person.name}</option>);
});

class D3Container extends React.Component {
  constructor() {
    this.state = {
      nodes: [],
      links: [],
      selectedPerson: _.first(PeopleStore.getPeople()).name,
      rendering: false,
      innerWidth: window.innerWidth,
      detailTodo: null,
      popUpTodo: null
    }
  }

  changePerson(event) {
    console.log(event.target.value);
    this.setState({
      selectedPerson: event.target.value
    });
    this.updateNodesAndLinks(event.target.value);
  }
  updateNodesAndLinks(person) {
    if(!person)
      person = this.state.selectedPerson;

    var nodes = [{label:person, weight:4, group: 1}];
    var links = [];

    var todos = TodoStore.getTodos();
    console.log(JSON.stringify(todos));
    _.each(todos, (todo) => {
      if(todo.assignedTo === person) {
        nodes.push({
          label: todo.title,
          weight: 1,
          id: todo.id,
          group: todo.subtaskOf ? 3 : 2
        });

        if(!todo.subtaskOf) {
          links.push({
            source: 0,
            target: nodes.length-1,
            weight: 10,
            relation: 'some weird relation'
          });
        }

        if(todo.subtaskOf) {
          var keys = Object.keys(todos);
          for(let i = 0; i < keys.length; i++) {
            if(todo.subtaskOf === todos[keys[i]].title) {
              var obj = {
                source: nodes.length-1,
                target: (function(todo) {
                  var index = -1;
                  _.each(nodes, (node) => {
                    if(node.label === todo.title) {
                      index = nodes.indexOf(node);
                    }
                  });
                  return index;
                })(todos[keys[i]]),
                weight: 5
              };
              links.push(obj);
            }
          }
        }
      }
    });

    this.setState({
      nodes,
      links,
      rendering: false
    }, this.forceLayout.bind(this));
  }

  componentDidMount() {
    TodoStore.addChangeListener(this.updateNodesAndLinks.bind(this));
    this.updateNodesAndLinks(this.state.selectedPerson);
  }

  clickNode(evt) {
    var id = evt.target.dataset.id;
    if(id)
      this.setState({
        detailTodo: TodoStore.getTodo(id)
      });
  }

  hoverNetwork(evt) {
    var dataSet = evt.target.dataset;

    style.popUpStyle.left = evt.clientX;
    style.popUpStyle.top = evt.clientY - 410;
    if (dataSet.id) {
      this.setState({
        popUpTodo: TodoStore.getTodo(dataSet.id)
      });
    } else if (dataSet.relation) {
      this.setState({
        popUpTodo: {
          title: dataSet.relation
        }
      })
    } else {
      this.setState({
        popUpTodo: null
      })
    }
  }

  forceLayout() {
    this.setState({rendering:true}, () => {
      var force = d3.layout.force()
        .nodes(this.state.nodes)
        .links(this.state.links)
        .charge(-800)
        .linkDistance(150)
        .size([this.state.innerWidth, 600]);

      var link = d3.selectAll('.link').data(this.state.links);
      var node = d3.selectAll('.node').data(this.state.nodes);

      force.start();
      force.on("tick", () => {
        link.attr("x1", function(d) { return d.source.x })
          .attr("y1", function(d) { return d.source.y })
          .attr("x2", function(d) { return d.target.x })
          .attr("y2", function(d) { return d.target.y });

        node.attr("cx", (d) => { return d.x })
          .attr("cy", (d) => { return d.y; });
      });


      var zoom = d3.behavior.zoom()
        .scaleExtent([1,10])
        .on("zoom", zoomed);

      d3.select('svg').call(zoom);
      function zoomed() {
        d3.select("#container").attr("transform", `translate(${d3.event.translate})scale(${d3.event.scale})`);
      }
    });
  }

  componentWillUpdate() {
    if(this.state.rendering == false) {
      this.forceLayout();
    }
    return true;
  }

  componentWillMount() {
    window.addEventListener('resize', () => {
      this.setState({
        innerWidth: window.innerWidth
      });
      this.forceLayout();
    })
  }

  render() {
    var todoDetail = this.state.detailTodo != null ?
      <span style={{float:'left', width: 150}}>{JSON.stringify(this.state.detailTodo)}</span>
    : '';

    var todoPopUp = this.state.popUpTodo != null ?
      <span style={style.popUpStyle}>{this.state.popUpTodo.title}</span> : '';

    /* SVG Content */
    var links = <g>
      {_.map(this.state.links, (l, i) => {
        return <line key={i} className="link" data-relation={l.relation} stroke="black" strokeWidth="2" />
      })}
    </g>;

    var nodes = <g>
      {_.map(this.state.nodes, (n, i) => {
       return <circle key={i} className="node" r="12"  data-id={n.id} style={{fill: color(n.group)}} />;
      }) }
    </g>;

    var svgContent = <g id="container">
                      {links}
                      {nodes}
                     </g>;

    return (
      <div style={this.props.style}>
        <h4>Select a person to change the visualization</h4>
        <select className="form-control" onChange={this.changePerson.bind(this)}>
          {options}
        </select>
        <svg width={this.state.innerWidth} height="600" style={ {border: '1px solid black'} } onClick={this.clickNode.bind(this)} onMouseOver={this.hoverNetwork.bind(this)} >
          {svgContent}
        </svg>
        {todoPopUp}
        {todoDetail}
      </div>
    );
  }
}

export default D3Container;
