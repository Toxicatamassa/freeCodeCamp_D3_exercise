// set the dimensions and margins of the graph
const margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;

// create the svg element
const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("./dataset/heart_attack_dataset.csv").then(function(data) {
    console.log(data);
    
    // create the x range and domain
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseFloat(d.Age))])
        .range([0, width]);
        
    // create the y range and domain
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => parseFloat(d.Cholesterol))])
        .range([height, 0]);

    // create circles
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(parseFloat(d.Age)))
        .attr("cy", d => y(parseFloat(d.Cholesterol)))
        .attr("r", 5)
        .attr("fill", "steelblue");

    // create the x axis
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    // create the y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add X axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .text("Age");

    // Add Y axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 20)
        .attr("x", -height / 2)
        .text("Cholesterol");

    // Add chart title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Age vs Cholesterol Levels");

    // Add tooltip
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.selectAll("circle")
        .on("mouseover", (event, d) => {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`Age: ${d.Age}<br/>Cholesterol: ${d.Cholesterol}`)
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", (d) => {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });
});

