

export const menu = () => {
  let id;
  let labelText;
  let options = [];
  const listeners = d3.dispatch('change');

  const my = (selection) => {
    selection
      .selectAll('label')
      .data([null])
      .join('label')
      .attr('for', id)
      .text(labelText);

    const select = selection
      .selectAll('select')
      .data([null])
      .join('select')
      .attr('id', id)
      .on('change', (event) => {
        listeners.call('change', null, event.target.value);
      });

    select
      .selectAll('option')
      .data(options)
      .join('option')
      .attr('value', d => d)
      .text(d => d);
  };

  my.id = function(value) {
    if (!arguments.length) return id;
    id = value;
    return my;
  };

  my.labelText = function(value) {
    if (!arguments.length) return labelText;
    labelText = value;
    return my;
  };

  my.options = function(value) {
    if (!arguments.length) return options;
    options = value;
    return my;
  };

  my.on = function() {
    const value = listeners.on.apply(listeners, arguments);
    return value === listeners ? my : value;
  };

  return my;
};