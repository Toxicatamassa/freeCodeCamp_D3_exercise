// Remove the import for d3, as we're now loading it from CDN
import { scatterPlot } from './scatterPlot.js';

console.log('Script started');

const csvUrl = [
  'https://gist.githubusercontent.com/',
  'curran/',
  'a08a1080b88344b0c8a7/',
  'raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/',
  'iris.csv',
].join('');

console.log('CSV URL:', csvUrl);

const parseRow = (d) => {
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  return d;
};

const width = window.innerWidth;
const height = window.innerHeight;

console.log('Window dimensions:', width, height);

const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

console.log('SVG appended');

const main = async () => {
  console.log('Main function started');
  
  try {
    const data = await d3.csv(csvUrl, parseRow);
    console.log('Data loaded:', data.length, 'rows');
    console.log('First row of data:', data[0]);
    console.log('Last row of data:', data[data.length - 1]);

    // Log the range of values for each dimension
    const dimensions = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width'];
    dimensions.forEach(dim => {
      const values = data.map(d => d[dim]);
      console.log(`${dim} range:`, Math.min(...values), 'to', Math.max(...values));
    });

    const plot = scatterPlot()
      .width(width)
      .height(height)
      .data(data)
      .xValue((d) => d.petal_width)
      .yValue((d) => d.sepal_length)
      .margin({
        top: 20,
        right: 20,
        bottom: 40,
        left: 50,
      })
      .radius(5);

    console.log('Scatter plot configured');

    svg.call(plot);
    console.log('Scatter plot rendered');

    // Log the first few elements created by D3
    console.log('SVG contents:', svg.node().outerHTML.slice(0, 500) + '...');

    const columns = [
      'petal_width',
      'sepal_width',
      'petal_length',
      'sepal_length',
    ];
    let i = 0;
    setInterval(() => {
      plot.xValue((d) => d[columns[i % columns.length]]);
      svg.call(plot);
      console.log('Plot updated with new x-value:', columns[i % columns.length]);
      i++;
    }, 2000);

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main();