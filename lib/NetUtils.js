/** 
	@npmpackage
	@class NetUtils
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { NetUtils } from 'ad-utils'
		</codeblock>
		<br><br>
		
		Utility functions that are common in making network requests.
*/
/**
	@memberOf NetUtils
	@method getQueryParameterBy
	@param {string} name
		the query string variable name
	@desc
		Analyses the URI query string and search for a key-value pair matching the requested var. 
*/
export function getQueryParameterBy(name) {
	var queryParams = {}
	var query = window.location.href.split('?')
	if (query.length > 1) {
		var params = query[1].split('&')
		for (var i in params) {
			var keyValue = params[i].split('=')
			if (keyValue.length == 2) queryParams[keyValue[0]] = decodeURIComponent(keyValue[1])
		}
	}
	return queryParams[name]
	//return global.queryParams[name]
}
