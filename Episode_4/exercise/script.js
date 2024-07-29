const width = window.innerWidth;
const height = window.innerHeight;

// Create SVG element
const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);


const solLewitt = (colorOne, colorTwo) => {
    // create a list of random x and y coordinates
const data = d3.range(30).map(() => ({
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height)
}));

// Create circles
svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('r', 5)
    .attr('fill', colorOne);


// Create lines between the circles in random order, also set the number of lines to be drawn
const lines = d3.range(1000).map(() =>({
    source: Math.floor(Math.random() * data.length),
    target: Math.floor(Math.random() * data.length)
}));

// Create lines
svg.selectAll('line')
    .data(lines)
    .enter()
    .append('line')
    .attr('x1', d => data[d.source].x)
    .attr('y1', d => data[d.source].y)
    .attr('x2', d => data[d.target].x)
    .attr('y2', d => data[d.target].y)
    .attr('stroke', colorTwo)
    .attr('stroke-width', 0.2)
};



const colorOne = d3.interpolateRainbow(Math.random());
const colorTwo = d3.interpolateRainbow(Math.random());

solLewitt(colorOne, colorTwo);
