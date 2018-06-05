/** 
	@npmpackage
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { getQueryParam } from 'ad-utils'
		</codeblock>
*/
/**
	@method getQueryParam
	@param {string} name
		OPTIONAL the query string variable name
	@desc
		Analyses the URI query string and return all as a key value paired object. Pass in a string to get a specific value.
*/
export default function getQueryParam(name) {
	let queryParams = {}
	const query = window.location.href.split('?')
	if (query.length > 1) {
		var params = query[1].split('&')
		for (let i in params) {
			const keyValue = params[i].split('=')
			if (keyValue.length == 2) queryParams[keyValue[0]] = decodeURIComponent(keyValue[1])
		}
	}

	return name ? queryParams[name] : Object.keys(queryParams).length > 0 ? queryParams : undefined
}
