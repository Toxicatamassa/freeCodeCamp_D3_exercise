// scatterplot in d3.js


// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// get the data

d3.csv("./dataset/heart_attack_dataset.csv").then(function(data) {
    console.log(data);
    // create the svg element
    const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    
    // create the chart group
    const scatterPlot = svg.append("g")
        .attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
    // create the x axis
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseFloat(d.Age))])
        .range([0, width]);
    
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseFloat(d.Cholesterol))])
        .range([height, 0]);
  

});