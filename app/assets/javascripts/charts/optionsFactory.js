var OptionsFactory = function() {

  this.get = function(type) {
    if(type === "pieChart") {
      return pieChartOptions;
    } else if(type === "historicalBarChart") {
      return historicalBarChartOptions;
    } else if(type === "multiBarChart") {
      return multiBarChartOptions;
    } else {
      throw 'Unknown type of chart';
    }
  }
}

var pieChartOptions = {
  chart: {
    type: 'pieChart',
    height: 300,
    x: function(d) { return d.key; },
    y: function(d) { return d.y; },
    color: ["#90D4F3", "#FEF4A1", "#F0A0A4", "#96CB9D"],
    showLabels: true,
    transitionDuration: 500,
    labelThreshold: 0.01,
    tooltipContent: function (key, x, y, e, graph) {
      return '<h3>' + key + ': ' + (x * 100).toFixed(1) + '%</h3>';
    },
    legend: {
      margin: {
        top: 5,
        right: 35,
        bottom: 5,
        left: 0
      }
    }
  }
};

var historicalBarChartOptions = {
  chart: {
    type: 'historicalBarChart',
    height: 300,
    margin : {
      top: 20,
      right: 20,
      bottom: 60,
      left: 50
    },
    x: function(d) { return d[0]; },
    y: function(d) { return d[1]; },
    showValues: true,
    valueFormat: function(d) {
      return d3.format('d')(d);
    },
    transitionDuration: 500,
    xAxis: {
      axisLabel: 'X Axis',
      tickFormat: function(d) {
        return d3.time.format('%x')(new Date(d))
      },
      rotateLabels: 50,
      showMaxMin: false
    },
    yAxis: {
      axisLabel: 'Y Axis',
      axisLabelDistance: 35,
      tickFormat: function(d){
        return d3.format('d')(d);
      }
    }
  }
};

var multiBarChartOptions = {
   chart: {
    type: 'multiBarChart',
    height: 300,
    width: 450,
    stacked: true,
    showControls: false,
    margin : {
      top: 20,
      right: 20,
      bottom: 60,
      left: 50
    },
    x: function(d) { return d[0]; },
    y: function(d) { return d[1]; },
    showValues: true,
    valueFormat: function(d) {
      return d3.format('d')(d);
    },
    transitionDuration: 500,
    xAxis: {
      axisLabel: 'X Axis',
      tickFormat: function(d) {
        return d;
      },
      rotateLabels: 50,
      showMaxMin: false
    },
    yAxis: {
      axisLabel: 'Number of tickets',
      axisLabelDistance: 35,
      tickFormat: function(d){
        return d3.format('d')(d);
      }
    }
  }
};