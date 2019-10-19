/*
 * reference: https://github.com/fanthos/chartjs-chart-timeline
 */

import Chart from 'chart.js';
import moment from 'moment';

import { parse, momentify } from './TimelineUtil';

const helpers = Chart.helpers;

export const scaleDefaults = {
  position: 'top',
  tooltips: {
    mode: 'nearest'
  },
  adapters: {},
  time: {
    parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
    format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
    unit: false, // false == automatic or override with week, month, year, etc.
    round: false, // none, or override with week, month, year, etc.
    displayFormat: false, // DEPRECATED
    isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
    minUnit: 'millisecond',
    distribution: 'linear',
    bounds: 'data',

    // defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
    displayFormats: {
      millisecond: 'h:mm:ss.SSS a', // 11:20:01.123 AM,
      second: 'h:mm:ss a', // 11:20:01 AM
      minute: 'h:mm a', // 11:20 AM
      hour: 'hA', // 5PM
      day: 'MMM D', // Sep 4
      week: 'll', // Week 46, or maybe "[W]WW - YYYY" ?
      month: 'MMM YYYY', // Sept 2015
      quarter: '[Q]Q - YYYY', // Q3
      year: 'YYYY' // 2015
    }
  },
  ticks: {
    autoSkip: false
  }
};

const MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
const MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

export const scale = Chart.scaleService.getScaleConstructor('time').extend({
  determineDataLimits: function() {
    const me = this;
    const chart = me.chart;
    const timeOpts = me.options.time;
    let min = MAX_INTEGER;
    let max = MIN_INTEGER;
    let timestamps = [];
    let timestampobj = {};
    let datasets = [];
    let i, j, ilen, jlen, data, timestamp0, timestamp1;

    // Convert data to timestamps
    for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
      if (chart.isDatasetVisible(i)) {
        data = chart.data.datasets[i].data;
        datasets[i] = [];

        for (j = 0, jlen = data.length; j < jlen; ++j) {
          timestamp0 = parse(data[j][0], me);
          timestamp1 = parse(data[j][1], me);
          if (timestamp0 > timestamp1) {
            [timestamp0, timestamp1] = [timestamp1, timestamp0];
          }
          if (min > timestamp0 && timestamp0) {
            min = timestamp0;
          }
          if (max < timestamp1 && timestamp1) {
            max = timestamp1;
          }
          datasets[i][j] = [timestamp0, timestamp1, data[j][2]];
          if (timestampobj.hasOwnProperty(timestamp0)) {
            timestampobj[timestamp0] = true;
            timestamps.push(timestamp0);
          }
          if (timestampobj.hasOwnProperty(timestamp1)) {
            timestampobj[timestamp1] = true;
            timestamps.push(timestamp1);
          }
        }
      } else {
        datasets[i] = [];
      }
    }

    if (timestamps.size) {
      timestamps.sort(function(a, b) {
        return a - b;
      });
    }

    min = parse(timeOpts.min, me) || min;
    max = parse(timeOpts.max, me) || max;

    // In case there is no valid min/max, var's use today limits
    min = min === MAX_INTEGER ? +moment().startOf('day') : min;
    max = max === MIN_INTEGER ? +moment().endOf('day') + 1 : max;

    // Make sure that max is strictly higher than min (required by the lookup table)
    me.min = Math.min(min, max);
    me.max = Math.max(min + 1, max);

    // PRIVATE
    me._horizontal = me.isHorizontal();
    me._table = [];
    me._timestamps = {
      data: timestamps,
      datasets: datasets,
      labels: []
    };
  }
});

export const controller = {
  getBarBounds: function(bar) {
    const vm = bar._view;
    let x1, x2, y1, y2;

    x1 = vm.x;
    x2 = vm.x + vm.width;
    y1 = vm.y;
    y2 = vm.y + vm.height;

    return {
      left: x1,
      top: y1,
      right: x2,
      bottom: y2
    };
  },

  update: function(reset) {
    const me = this;
    const meta = me.getMeta();
    const chartOpts = me.chart.options;
    if (
      chartOpts.textPadding ||
      chartOpts.minBarWidth ||
      chartOpts.showText ||
      chartOpts.colorFunction
    ) {
      const elemOpts = me.chart.options.elements;
      elemOpts.textPadding = chartOpts.textPadding || elemOpts.textPadding;
      elemOpts.minBarWidth = chartOpts.minBarWidth || elemOpts.minBarWidth;
      elemOpts.colorFunction =
        chartOpts.colorFunction || elemOpts.colorFunction;
      elemOpts.minBarWidth = chartOpts.minBarWidth || elemOpts.minBarWidth;
      if (Chart._tl_depwarn !== true) {
        console.log(
          'Timeline Chart: Configuration deprecated. Please check document on Github.'
        );
        Chart._tl_depwarn = true;
      }
    }

    helpers.each(
      meta.data,
      function(rectangle, index) {
        me.updateElement(rectangle, index, reset);
      },
      me
    );
  },

  updateElement: function(rectangle, index, reset) {
    const me = this;

    const meta = me.getMeta();
    const xScale = me.getScaleForId(meta.xAxisID);
    const yScale = me.getScaleForId(meta.yAxisID);
    const dataset = me.getDataset();
    const data = dataset.data[index];
    const custom = rectangle.custom || {};
    const datasetIndex = me.index;
    const opts = me.chart.options;
    const elemOpts = opts.elements || {};
    const rectangleElementOptions = elemOpts.rectangle;
    // const textPad = elemOpts.textPadding;
    const minBarWidth = elemOpts.minBarWidth;

    rectangle._xScale = xScale;
    rectangle._yScale = yScale;
    rectangle._datasetIndex = me.index;
    rectangle._index = index;

    const appIcon = data[2].icon;

    const ruler = me.getRuler(index);

    const x = xScale.getPixelForValue(data[0]);
    const end = xScale.getPixelForValue(data[1]);

    const y = yScale.getPixelForValue(data, datasetIndex, datasetIndex);
    const width = end - x;
    const height = me.calculateBarHeight(ruler);
    const color = elemOpts.colorFunction(appIcon, data, dataset, index);

    let font = elemOpts.font;

    if (!font) {
      font = '12px bold Arial';
    }

    // This one has in account the size of the tick and the height of the bar, so we just
    // divide both of them by two and subtract the height part and add the tick part
    // to the real position of the element y. The purpose here is to place the bar
    // in the middle of the tick.
    const boxY = y - height / 2;

    rectangle._model = {
      x: reset ? x - width : x, // Top left of rectangle
      y: boxY, // Top left of rectangle
      width: Math.max(width, minBarWidth),
      height: height,
      base: x + width,
      backgroundColor: color.rgbaString(),
      borderSkipped: custom.borderSkipped
        ? custom.borderSkipped
        : rectangleElementOptions.borderSkipped,
      borderColor: custom.borderColor
        ? custom.borderColor
        : helpers.getValueAtIndexOrDefault(
            dataset.borderColor,
            index,
            rectangleElementOptions.borderColor
          ),
      borderWidth: custom.borderWidth
        ? custom.borderWidth
        : helpers.getValueAtIndexOrDefault(
            dataset.borderWidth,
            index,
            rectangleElementOptions.borderWidth
          ),
      // Tooltip
      label: me.chart.data.labels[index],
      datasetLabel: dataset.label,

      appIcon: appIcon
    };

    rectangle.draw = function() {
      const ctx = this._chart.ctx;
      const vm = this._view;
      const oldAlpha = ctx.globalAlpha;
      const oldOperation = ctx.globalCompositeOperation;

      // Draw new rectangle with Alpha-Mix.
      ctx.fillStyle = vm.backgroundColor;
      ctx.lineWidth = vm.borderWidth;
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillRect(vm.x, vm.y, vm.width, vm.height);

      ctx.globalAlpha = 0.5;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillRect(vm.x, vm.y, vm.width, vm.height);

      ctx.globalAlpha = oldAlpha;
      ctx.globalCompositeOperation = oldOperation;
      // ctx.beginPath();

      // Draw app icon image over rectangle
      const img = new Image();
      img.src = vm.appIcon;
      img.onload = function() {
        ctx.drawImage(img, vm.x + vm.width / 2, vm.y + vm.height / 4, 15, 15);
      };
    };

    rectangle.inXRange = function(mouseX) {
      const bounds = me.getBarBounds(this);
      return mouseX >= bounds.left && mouseX <= bounds.right;
    };
    rectangle.tooltipPosition = function() {
      const vm = this.getCenterPoint();
      return {
        x: vm.x,
        y: vm.y
      };
    };

    rectangle.getCenterPoint = function() {
      const vm = this._view;
      let x, y;
      x = vm.x + vm.width / 2;
      y = vm.y + vm.height / 2;

      return {
        x: x,
        y: y
      };
    };

    rectangle.inRange = function(mouseX, mouseY) {
      let inRange = false;

      if (this._view) {
        const bounds = me.getBarBounds(this);
        inRange =
          mouseX >= bounds.left &&
          mouseX <= bounds.right &&
          mouseY >= bounds.top &&
          mouseY <= bounds.bottom;
      }
      return inRange;
    };

    rectangle.pivot();
  },

  getBarCount: function() {
    const me = this;
    let barCount = 0;
    helpers.each(
      me.chart.data.datasets,
      function(dataset, datasetIndex) {
        const meta = me.chart.getDatasetMeta(datasetIndex);
        if (meta.bar && me.chart.isDatasetVisible(datasetIndex)) {
          ++barCount;
        }
      },
      me
    );
    return barCount;
  },

  draw: function(ease) {
    const easingDecimal = ease || 1;
    let i, len;
    const metaData = this.getMeta().data;
    for (i = 0, len = metaData.length; i < len; i++) {
      metaData[i].transition(easingDecimal).draw();
    }
  },

  // From controller.bar
  calculateBarHeight: function(ruler) {
    const me = this;
    const yScale = me.getScaleForId(me.getMeta().yAxisID);
    if (yScale.options.barThickness) {
      return yScale.options.barThickness;
    }
    return yScale.options.stacked ? ruler.categoryHeight : ruler.barHeight;
  },

  removeHoverStyle: function(e) {
    // TODO
  },

  setHoverStyle: function(e) {
    // TODO: Implement this
  }
};

export const data = {
  labels: ['User', 'Project'],
  datasets: [
    {
      data: [
        [
          new Date(2018, 1, 22, 18, 0, 0),
          new Date(2018, 1, 22, 21, 0, 13),
          {
            name: 'Chrome',
            icon:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Chrome_icon_%28September_2014%29.svg/512px-Google_Chrome_icon_%28September_2014%29.png',
            category: 'Browser'
          },
          '#98E3D5'
        ]
      ]
    },
    {
      data: [
        [
          new Date(2018, 1, 22, 9, 0, 0),
          new Date(2018, 1, 22, 12, 16, 0),
          {
            name: 'Visual Studio Code',
            icon:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Visual_Studio_Code_1.18_icon.svg/512px-Visual_Studio_Code_1.18_icon.png',
            category: 'Development'
          },
          '#F1E15B'
        ],
        [
          new Date(2018, 1, 22, 14, 14, 0),
          new Date(2018, 1, 22, 15, 1, 45),
          {
            name: 'Safari',
            icon:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/1028px-Safari_browser_logo.png',
            category: 'Browser'
          },
          '#E8C1A0'
        ],
        [
          new Date(2018, 1, 22, 15, 30, 10),
          new Date(2018, 1, 22, 15, 59, 0),
          {
            name: 'Safari',
            icon:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Safari_browser_logo.svg/1028px-Safari_browser_logo.png',
            category: 'Browser'
          },
          '#E8C1A0'
        ]
      ]
    }
  ]
};

export const defaults = {
  elements: {
    colorFunction: function(icon, data) {
      return Color(data[3]);
    },
    showText: true,
    textPadding: 4,
    minBarWidth: 1
  },

  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  },

  legend: {
    display: false
  },

  scales: {
    xAxes: [
      {
        type: 'timeline',
        position: 'top',
        distribution: 'linear',
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        gridLines: {
          display: true,
          // offsetGridLines: true,
          drawBorder: true,
          drawTicks: true
        },
        ticks: {
          fontColor: '#e2e2e2',
          maxRotation: 0
        },
        unit: 'day'
      }
    ],

    yAxes: [
      {
        type: 'category',
        position: 'left',
        barThickness: 40,
        categoryPercentage: 0.8,
        // barPercentage: 0.9,
        offset: true,
        gridLines: {
          display: true,
          offsetGridLines: true,
          drawBorder: true,
          drawTicks: true
        },
        ticks: {
          fontColor: '#e2e2e2'
        }
      }
    ]
  },

  tooltips: {
    titleFontSize: 16,
    bodyFontSize: 13,
    backgroundColor: 'rgba(0,0,0,0.4)',
    caretSize: 5,
    cornerRadius: 2,
    titleFontcolor: '#fff',
    bodyFontcolor: '#fff',
    borderColor: '#B3B3B3',
    borderWidth: 1,
    displayColors: false,
    yAlign: 'bottom',
    xAlign: 'center',
    yPadding: 20,
    xPadding: 45,
    _bodyAlign: 'center',
    _footerAlign: 'center',
    callbacks: {
      title: function(tooltipItems, data) {
        const d = data.labels[tooltipItems[0].datasetIndex];
        return d;
      },
      label: function(tooltipItem, data) {
        const d =
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        const app = d[2];

        const startTime = moment(d[0]);
        const endTime = moment(d[1]);
        const diffTime = endTime.diff(startTime);
        const duration = moment.duration(diffTime);

        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        let durationString = '';
        if (hours) durationString += `${hours}h`;
        if (minutes) durationString += ` ${minutes}m`;
        if (seconds) durationString += ` ${seconds}s`;

        return [
          `App: ${app.name} - ${durationString}`,
          `Project: ${app.category}`
        ];
      }
    }
  }
};
