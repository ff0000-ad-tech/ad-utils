export default function() {
	var queryParams = {}
	var query = window.location.href.split('?')
	if (query.length > 1) {
		var params = query[1].split('&')
		for (var i in params) {
			var keyValue = params[i].split('=')
			if (keyValue.length == 2) queryParams[keyValue[0]] = decodeURIComponent(keyValue[1])
		}
	}
	return queryParams
}
