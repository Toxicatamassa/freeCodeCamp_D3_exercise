import { scatterPlot } from "./scatterPlot.js";
import { menu } from "./menu.js";

const csvUrl = [
  "https://gist.githubusercontent.com/",
  "curran/", // User
  "a08a1080b88344b0c8a7/", // Id of the Gist
  "raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/", // commit
  "iris.csv", // File name
].join("");
const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const width = window.innerWidth;
const height = window.innerHeight;
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const menuContainer = d3
  .select("body")
  .append("div")
  .attr("class", "menu-container");

const xMenu = menuContainer.append("div");
const yMenu = menuContainer.append("div");

const main = async () => {
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(await d3.csv(csvUrl, parseRow))
    .xValue((d) => d.petal_width)
    .yValue((d) => d.petal_width)
    .margin({
      top: 20,
      right: 20,
      bottom: 40,
      left: 120,
    })
    .radius(5);

  svg.call(plot);

  const options = [
    {
      value: "petal_width",
      text: "Petal Width",
      type: "quantitative",
    },
    {
      value: "sepal_width",
      text: "Sepal Width",
      type: "quantitative",
    },
    {
      value: "petal_length",
      text: "Petal Length",
      type: "quantitative",
    },
    {
      value: "species",
      text: "Sepal Length",
      type: "quantitative",
    },
    {
      value: "species",
      text: "Species",
      type: "categorical",
    },
  ];

  // const columnToType = new Map();
  // options.forEach(option => {
  //   columnToType.set(option.value, option.type);
  // });
  // console.log(options.map(({ value, type }) => [value, type]))
  const columnToType = new Map(options.map(({ value, type }) => [value, type]));
  options.forEach((option) => {
    columnToType.set(option.value, option.type);
  });

  // column is a string, corresponding to
  // the value property on metadata objects.
  const getType = (column) => columnToType.get(column);
  // options.find((d) => d.value === column).type;

  xMenu.call(
    menu()
      .id("x-menu")
      .labelText("X:")
      .options(options)
      .on("change", (column) => {
        console.log(getType(column));
        svg.call(plot.xValue((d) => d[column]).xType(getType(column)));
      })
  );
  yMenu.call(
    menu()
      .id("y-menu")
      .labelText("Y:")
      .options(options)
      .on("change", (column) => {
        svg.call(plot.yValue((d) => d[column]).yType(getType(column)));
      })
  );
};
main();
