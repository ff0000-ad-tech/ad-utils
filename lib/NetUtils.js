/** 
	@class NetUtils
	@desc
		Utility functions that are common in making network requests.
*/
var NetUtils = new function() {

	/**
		@memberOf NetUtils
		@method getQueryParameterBy
		@param {string} name
			the query string variable name
		@desc
			Analyses the URI query string and search for a key-value pair matching the requested var. 
	*/
	this.getQueryParameterBy = function( name ) {
		return global.queryParams [ name ];
	}

}

export default NetUtils