/** 
	@class NetUtils
	@desc
		<a href="https://github.com/ff0000-ad-tech/ad-utils">Github repo</a>
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
	return global.queryParams[name]
}