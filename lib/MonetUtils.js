/**
 * @npmpackage
 * @class MonetUtils
 * @desc
 * Monet utilities.
 * <codeblock>
 * import { MonetUtils } from 'ad-utils'
 * </codeblock>
 */

let _data;

export function setData(integrator) {
  var promise = integrator.getMonetData();
  promise.then(function(data) {
    _data = data;
  });
  return promise;
}

export function getDataByKey(key) {
  return _data[key] && _data[key].value;
}
