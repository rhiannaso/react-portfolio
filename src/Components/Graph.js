import React, { Component } from 'react';
import config from '../config.js';
const firebase = require('firebase')
var d3 = require('d3');

let data = {
  nodes: [],
  links: [],
}

let encounteredActors = [];
let actorPos = [];

export class Graph extends Component {
  constructor(props) {
    super();
    this.state = {
      movInfo: {},
    }
  }

  drag = (simulation, tooltip) => {
    function dragStarted(d) {
      if(!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
      tooltip.style('visibility', 'visible');
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
      // console.log('dragged x: '+d.fx);
      // console.log('dragged y: '+d.fy);
      // console.log(d);
      tooltip.style('top', (d.fy+150)+'px').style('left',(d.fx+30)+'px');
    }

    function dragEnded(d) {
      if(!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
      tooltip.style('visibility', 'hidden');
    }

    return d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded);
  }

  chart(nodes, links) {
    const width = window.innerWidth;
    const height = window.innerHeight-160;

    const obj_links = links.map(d => Object.create(d));
    const obj_nodes = nodes.map(d => Object.create(d));

    const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);

    const link = svg.append('g')
      .attr('stroke', '#777')
      .attr('stroke-opacity', 1)
      .selectAll('line')
      .data(obj_links)
      .join('line')
      .attr('stroke-width', 1);

    const radius = (node) => {
      if(node.type === 'actor') {
        return 25;
      } 
      return 75;
    }

    const bg = (node) => {
      if(node.type === 'movie') {
        return node.src;
      }
      return '';
    }

    const simulation = d3.forceSimulation(obj_nodes)
      .force('link', d3.forceLink().links(links).id(d => { return d.name; }).distance(200))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width/2, height/2));

    let tooltip = d3.select('body')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')

    svg.append('defs')
      .selectAll('pattern')
      .data(obj_nodes)
      .enter()
      .append("pattern")
      .attr('id', function(d) {
        return 'id-'+d.id;
      })
      .attr('patternUnits', 'objectBoundingBox')
      .attr('width', 1)
      .attr('height', 1)
      .append('image')
      .attr('xlink:href', bg)
      .attr('x', -35)
      .attr('y', -35)
      .attr('width', 220)
      .attr('height', 220);

    const node = svg.append('g')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 1.5)
      .selectAll('circle')
      .data(obj_nodes)
      .join('circle')
      .attr('r', radius)
      .attr('cursor', 'pointer')
      .style('fill', function(d) { 
        if(d.type === 'movie') {
          return ("url(#id-"+d.id+")");
        }
        return d3.color('gray');
      })

    /*let tooltip = svg.append('text')
      .style('font-size', '24px');*/

    node.on('mouseover', function(node){
        if(node.type === 'actor') {
          /*let x = node.x + 70;
          let y = node.y + 35;
          tooltip
            .text(node.name)
            .style('transform', `translate(${x}px, ${y}px)`)
            .style('visibility', 'visible')*/
          tooltip.text(node.name);
          tooltip.style('visibility', 'visible');
          // console.log(d3.event);
          // console.log('event x: '+d3.event.x);
          // console.log('event y: '+d3.event.y);
          tooltip.style('top', (d3.event.y-20)+'px').style('left',(d3.event.x+20)+'px');
        }
      })
	    .on('mousemove', function(){
        //tooltip.style('top', (d3.event.y-20)+'px').style('left',(d3.event.x+20)+'px');
      })
	    .on('mouseout', function(){
        return tooltip.style('visibility', 'hidden');
      })
      .call(this.drag(simulation, tooltip));

    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node.attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });

    return svg.node();
  }

  componentDidMount(){
    document.title = 'Graph Visualization';
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let movsInGraph = [];
    let ref = firebase.database().ref('relations');
    ref.once('value').then(snapshot => {
      let rels = snapshot.val();
      for (let entry in rels) {
        if(rels[entry].list === 'GraphViz') {
          movsInGraph.push(rels[entry].mov);
        }
      }
    });

    let movInfo = [];
    let movsRef = firebase.database().ref('movies');
    movsRef.once('value').then(snapshot => {
      let movies = snapshot.val();
      for (let entry in movies) {
        if (movsInGraph.includes(entry)) {
          movInfo.push({
            id:  entry,
            name:  movies[entry].name,
            src:  movies[entry].src,
            actors: movies[entry].actors,
          })
        }
      }

      let ctr = 0;
      for(let i in movInfo) {
        let movieObj = {
          type: 'movie',
          name: movInfo[i].name,
          src: movInfo[i].src,
          id: ctr,
        }
        ctr++;
        data.nodes.push(movieObj);

        let actors = movInfo[i].actors.split(', ');
        for(let j in actors) {
          let actObj = {
            type: 'actor',
            name: actors[j],
            id: ctr,
          }
          ctr++;
          if(!(encounteredActors.includes(actors[j]))) {
            encounteredActors.push(actors[j]);
            data.nodes.push(actObj);
            let loc = data.nodes.indexOf(actObj);
            actorPos.push(loc);
          }
          
          let linkObj = {
            source: movInfo[i].name,
            target: actors[j],
          }
          data.links.push(linkObj);
        }
      }

      const elem = document.getElementById('svg');
      elem.appendChild(this.chart(data.nodes, data.links));
    });
  }

  render() {
    return(
      <div id='svg'></div>      
    );
  }
}
export default Graph;