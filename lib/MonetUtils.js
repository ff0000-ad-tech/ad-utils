/**
	@npmpackage
	@class MonetUtils
	@desc
		Monet utilities.
		<br>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { MonetUtils } from 'ad-utils'
		</codeblock>
		<br><br>
*/

let _data

// prettier-ignore
let _monetTypes = {
	'text': 'text',
	'number': 'value',
	'image': 'url',
	'video': 'url',
	'url': 'url',
	'bool': 'value'
}

export function setData(integrator) {
	const M = this
	var promise = integrator.getMonetData()
	promise.then(function(data) {
		M._data = data
	})
	return promise
}

export function getDataByKey(key) {
	const M = this
	var output
	var outputType
	for (var type in M._monetTypes) {
		if (M._data.rootAssets[type + '.' + key]) {
			outputType = type
			output = M._data.rootAssets[type + '.' + key]
			break
		}
	}
	return output[M._monetTypes[outputType]]
}
