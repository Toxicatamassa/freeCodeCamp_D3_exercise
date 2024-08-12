// Remove the import statement at the top

export const scatterPlot = () => {
    let width;
    let height;
    let data;
    let xValue;
    let yValue;
    let margin;
    let radius;
  
    const my = (selection) => {
      if (!width || !height || !data || !xValue || !yValue || !margin || !radius) {
        console.error('ScatterPlot: Not all required properties are set.');
        return;
      }
  
      const x = d3.scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([margin.left, width - margin.right]);
  
      const y = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([height - margin.bottom, margin.top]);
  
      const marks = data.map((d) => ({
        x: x(xValue(d)),
        y: y(yValue(d)),
      }));
  
      selection
        .selectAll('circle')
        .data(marks)
        .join('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', radius);
  
      selection
        .selectAll('.y-axis')
        .data([null])
        .join('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
  
      selection
        .selectAll('.x-axis')
        .data([null])
        .join('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));
    };
  
    // Getter/setter methods remain the same
    my.width = function (_) {
      return arguments.length ? ((width = +_), my) : width;
    };
  
    my.height = function (_) {
      return arguments.length ? ((height = +_), my) : height;
    };
  
    my.data = function (_) {
      return arguments.length ? ((data = _), my) : data;
    };
  
    my.xValue = function (_) {
      return arguments.length ? ((xValue = _), my) : xValue;
    };
  
    my.yValue = function (_) {
      return arguments.length ? ((yValue = _), my) : yValue;
    };
  
    my.margin = function (_) {
      return arguments.length ? ((margin = _), my) : margin;
    };
  
    my.radius = function (_) {
      return arguments.length ? ((radius = +_), my) : radius;
    };
  
    return my;
  };