
const width = innerWidth;
const height = innerHeight;


const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const n = 100;

svg.append('g')
    .selectAll('rect')
    .data(d3.range(n))
    .enter()
    .append('rect')
    .attr('y', d => d * 20)
    .attr('width', d => width)
    .attr('height', d => 10)
    .attr('mask', d => 'url(#circle-mask)');

svg.append('g')
    .selectAll('rect')
    .data(d3.range(n))
    .enter()
    .append('rect')
    .attr('x', d => d * 20)
    .attr('width', d => 10)
    .attr('height', d => height)
    .attr('mask', d => 'url(#circle-mask-2)');

const mask = svg.append('mask').attr('id', 'circle-mask');

mask.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'black');

mask.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', 200)
    .attr('fill', 'white');

const mask_2 = svg.append('mask').attr('id', 'circle-mask-2');

mask_2.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'white');

mask_2.append('circle')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    .attr('r', 200)
    .attr('fill', 'black');