const csvUrl =
  "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

// Dimensioner för diagrammet
const margin = {top: 40, right: 40, bottom: 60, left: 60};
const width = window.innerWidth - margin.left - margin.right;
const height = window.innerHeight - margin.top - margin.bottom;

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const xValue = (d) => d.petal_length;
const yValue = (d) => d.sepal_length;

//create svg
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const main = async () => {
  const data = await d3.csv(csvUrl, parseRow);

  // Create scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue))
    .range([0, width])
    .nice();

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, yValue))
    .range([height, 0])
    .nice();



  // Append circles
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("fill", "steelblue")
    .attr("r", 5);

    

  // Create axes
  svg
    .append("g")
    .attr("transform", `translate(0,0)`)
    .call(d3.axisLeft(yScale));

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));
};

main();