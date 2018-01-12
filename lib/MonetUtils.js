/**
	@class MonetUtils
	@desc
		Monet utilities.
*/
class MonetUtils {
	static _data;
	static _monetTypes = {
		text: 'text',
		number: 'value',
		image: 'url',
		video: 'url',
		url: 'url',
		bool: 'value'
	};
	
	static setData = function(integrator) {
		const M = this
		var promise = integrator.getMonetData()
		promise.then(function(data){
			M._data = data;
		})
		return promise;
	}
	
	static getDataByKey = function(key) {
		const M = this
		var output;
		var outputType;
		for (var type in _monetTypes) {
			if (M._data.rootAssets[type + '.' + key]) {
				outputType = type;
				output = M._data.rootAssets[type + '.' + key];
				break;
			}
		}
		return output[_monetTypes[outputType]];
	}
}

export default MonetUtils