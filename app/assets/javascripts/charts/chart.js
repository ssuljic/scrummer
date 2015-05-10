var Chart = function(options, data, title) {
  this.options = options;
  this.data = data;
  this.title = title;
};

var ChartsBuilder = function(summary) {
  this.summary = summary;
  this.charts = [];

  this.build = function() {
    var charts = this.charts;

    _.each(summary, function(chartData) {
      var optionsFactory = new OptionsFactory();
      var options = optionsFactory.get(chartData.type);
      var chart = new Chart(options, chartData.data, chartData.title);
      charts.push(chart);
    });

    return charts;
  }
};