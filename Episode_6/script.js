import * as D3 from '../node_modules/d3/dist/d3.js';


d3.select('body').append('h1').text('Hello, D3!');

// create a new SVG element
const svg = d3.select('body').append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .style('border', '1px solid black')
    .style('background-color', 'black');

// create a bar chart
const dataset = [5, 10, 15, 20, 25];

svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 30)
    .attr('y', (d) => 480 - d * 10)
    .attr('width', 25)
    .attr('height', (d) => d * 10)
    .attr('fill', 'blue');
