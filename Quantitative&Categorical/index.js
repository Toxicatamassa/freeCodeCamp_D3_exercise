
import { scatterPlot } from './scatterPlot.js';
import { menu } from './menu.js';

const csvUrl = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv';

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

const menuContainer = d3.select('body')
  .append('div')
  .attr('class', 'menu-container');

const xMenu = menuContainer.append('div');
const yMenu = menuContainer.append('div');

const main = async () => {
  const data = await d3.csv(csvUrl, parseRow);
  
  const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    .xValue((d) => d.petal_width)
    .yValue((d) => d.petal_length)
    .margin({
      top: 20,
      right: 20,
      bottom: 40,
      left: 50,
    })
    .radius(5);

  svg.call(plot);

  const options = [
    { value: 'petal_width', text: 'Petal Width' },
    { value: 'sepal_width', text: 'Sepal Width' },
    { value: 'petal_length', text: 'Petal Length' },
    { value: 'sepal_length', text: 'Sepal Length' },
    { value: 'species', text: 'Species' }
  ];

  xMenu.call(
    menu()
      .id('x-menu')
      .labelText('X:')
      .options(options.map(d => d.value))
      .on('change', (column) => {
        svg.call(plot.xValue((d) => d[column]));
      })
  );
  yMenu.call(
    menu()
      .id('y-menu')
      .labelText('Y:')
      .options(options.map(d => d.value))
      .on('change', (column) => {
        svg.call(plot.yValue((d) => d[column]));
      })
  );
};

main();