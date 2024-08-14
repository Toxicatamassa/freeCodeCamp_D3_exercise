export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let xType;
  let yType;
  let margin;
  let radius;

  const my = (selection) => {
    const x = (
      xType === "categorical"
        ? d3.scalePoint().domain(data.map(xValue)).padding(0.2)
        : d3.scaleLinear().domain(d3.extent(data, xValue))
    ).range([margin.left, width - margin.right]);

    const y = (
      yType === "categorical"
        ? d3.scalePoint().domain(data.map(yValue)).padding(0.2)
        : d3.scaleLinear().domain(d3.extent(data, yValue))
    ).range([height - margin.bottom, margin.top]);

    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
    }));

    const t = d3.transition().duration(1000);

    const positionCircles = (circles) => {
      circles.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    };

    const initializeRadius = (circles) => {
      circles.attr("r", 0);
    };
    const growRadius = (enter) => {
      enter.transition(t).attr("r", radius);
    };

    const circles = selection
      .selectAll("circle")
      .data(marks)
      .join(
        (enter) =>
          enter
            .append("circle")
            .call(positionCircles)
            .call(initializeRadius)
            .call(growRadius),
        (update) =>
          update.call((update) =>
            update
              .transition(t)
              .delay((d, i) => i * 10)
              .call(positionCircles)
          ),
        (exit) => exit.remove()
      );

    selection 
      .selectAll(".y-axis")
      .data([null])
      .join("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .transition(t)
      .call(d3.axisLeft(y));

    selection
      .selectAll(".x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .transition(t)
      .call(d3.axisBottom(x));
  };

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

  my.xType = function (_) {
    return arguments.length ? ((xType = _), my) : xType;
  };

  my.yType = function (_) {
    return arguments.length ? ((yType = _), my) : yType;
  };

  my.margin = function (_) {
    return arguments.length ? ((margin = _), my) : margin;
  };

  my.radius = function (_) {
    return arguments.length ? ((radius = +_), my) : radius;
  };

  return my;
};
