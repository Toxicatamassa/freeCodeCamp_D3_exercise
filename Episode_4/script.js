const width = document.documentElement.clientWidth;
const height = window.innerHeight;

const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const n = 100;

// Skapa rektanglar med mask1
svg.append('g')
    .selectAll('rect')
    .data(d3.range(n))
    .enter()
    .append('rect')
    .attr('y', d => d * 20)
    .attr('width', d => width)
    .attr('height', d => 10)
    .attr('mask', 'url(#mask1)');

// Skapa rektanglar med mask2
svg.append('g')
    .selectAll('rect')
    .data(d3.range(n))
    .enter()
    .append('rect')
    .attr('x', d => d * 20)
    .attr('width', d => 10)
    .attr('height', d => height)
    .attr('mask', 'url(#mask2)');

const symbols = [
    d3.symbolCircle,
    d3.symbolCross,
    d3.symbolDiamond,
    d3.symbolSquare,
    d3.symbolStar,
    d3.symbolTriangle,
    d3.symbolWye
];

const renderMask = (id, inverted) => {
    const mask = svg.append('mask').attr('id', id);

    // Bind data for both rectangles and paths
    const symbolGroups = mask.selectAll('g')
        .data(symbols)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${150 + i * 200}, ${height / 2})`);

    // Append a rectangle for each symbol
    symbolGroups.append('rect')
        .attr('width', 300) // Set your desired width
        .attr('height', 300) // Set your desired height
        .attr('x', -125) // Adjust based on the size to center
        .attr('y', -150) // Adjust based on the size to center
        .attr('fill', inverted ? 'white' : 'black'); // Example fill, adjust as needed

    // Append paths as before, now within each group
    symbolGroups.append('path')
        .attr('d', d3.symbol().type(d => d).size(10000))
        .attr('fill', inverted ? 'black' : 'white');
};

// Kalla på renderMask-funktionerna direkt
renderMask('mask1', false);
renderMask('mask2', true);
