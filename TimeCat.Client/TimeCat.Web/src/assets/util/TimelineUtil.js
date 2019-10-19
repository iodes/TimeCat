import Chart from 'chart.js';
import moment from 'moment';

const helpers = Chart.helpers;

export function parse(input, scale) {
  if (helpers.isNullOrUndef(input)) {
    return null;
  }

  const options = scale.options.time;
  const value = momentify(scale.getRightValue(input), options);
  if (!value.isValid()) {
    return null;
  }

  if (options.round) {
    value.startOf(options.round);
  }

  return value.valueOf();
}

/**
 * Convert the given value to a moment object using the given time options.
 * @see http://momentjs.com/docs/#/parsing/
 */
export function momentify(value, options) {
  const parser = options.parser;
  const format = options.parser || options.format;

  if (typeof parser === 'function') {
    return parser(value);
  }

  if (typeof value === 'string' && typeof format === 'string') {
    return moment(value, format);
  }

  if (!(value instanceof moment)) {
    value = moment(value);
  }

  if (value.isValid()) {
    return value;
  }

  // Labels are in an incompatible moment format and no `parser` has been provided.
  // The user might still use the deprecated `format` option to convert his inputs.
  if (typeof format === 'function') {
    return format(value);
  }

  return value;
}
