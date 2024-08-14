export const scatterPlot = () => {
  let width;
  let height;
  let data;
  let xValue;
  let yValue;
  let margin;
  let radius;
  let xAxisLabel;
  let yAxisLabel;

  const my = (selection) => {
    // Check if all required properties are set
    if (
      !width ||
      !height ||
      !data ||
      !xValue ||
      !yValue ||
      !margin ||
      !radius
    ) {
      console.error("ScatterPlot: Not all required properties are set.");
      return;
    }

    // Set up scales
    const x =
      xType === "categorial"
      ? d3
        .scalePoint()
        .domain(data.map(xValue))
        .range([margin.left, width - margin.right])
      : d3
        .scaleLinear()
        .domain(d3.extent(data, xValue))
        .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data, yValue))
      .range([height - margin.bottom, margin.top]);

    // Create marks
    const marks = data.map((d) => ({
      x: x(xValue(d)),
      y: y(yValue(d)),
    }));

    // Set up transition
    const t = d3.transition().duration(2000).ease(d3.easeExpIn);

    // Update circles
    selection
      .selectAll("circle")
      .data(marks)
      .join(
        (enter) =>
          enter
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr("r", 0),
        (update) =>
          update.call((update) =>
            update
              .transition(t)
              .delay((d, i) => i * 10)
              .attr("cx", (d) => d.x)
              .attr("cy", (d) => d.y)
              .attr("r", radius)
          ),
        (exit) =>
          exit
            .transition(t)
            .duration(1000) // Change the duration to 2000 milliseconds
            .attr("fill", "red") // Change the color to red
            .remove()
      )
      .transition(t)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", radius);

    // Update axes
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

    // add axis labels
    selection
      .selectAll(".x-axis-label")
      .data([null])
      .join("text")
      .attr("class", "x-axis-label")
      .attr("x", width - margin.right - 100)
      .attr("y", height - 2 * margin.bottom + 20)
      .attr("text-anchor", "middle")

      .text(xAxisLabel);

    selection
      .selectAll(".y-axis-label")
      .data([null])
      .join("text")
      .attr("class", "y-axis-label")
      .attr("x", margin.left / 2 + 160)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text(yAxisLabel);
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

  my.xAxisLabel = function (_) {
    return arguments.length ? ((xAxisLabel = _), my) : xAxisLabel;
  };

  my.yAxisLabel = function (_) {
    return arguments.length ? ((yAxisLabel = _), my) : yAxisLabel;
  };

  return my;
};
