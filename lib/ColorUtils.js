/**
	@class ColorUtils
	@desc
		This class contains methods for manipulating color.
*/
var ColorUtils = new function() {

	var CU = this;


	/**	
		@memberOf ColorUtils
		@method toRgba
		@param {string|object} color
			the color to convert, represented as a HEX string:"#ff0000", 
			an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
			or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		@param {number} alpha
			the optional alpha value for the return string: overrides the alpha value of an RGBA color. 
			If undefined, will default to the alpha value of the color.
		@desc
			Returns an object containing r, g, b, a properties 
	*/
	CU.toRgba = function(color, alpha) {
		switch (typeof color) {
			case 'object':
				color = color || {
					r: 0,
					g: 0,
					b: 0,
					a: 1
				}
				break;
			default:
				// convert from rgb() or rgba() string
				if (color.indexOf('rgb') >= 0) {
					color = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')')).split(/,\s*/);
					color = {
						r: color[0],
						g: color[1],
						b: color[2],
						a: Number(color[3])
					};
				} else if (color.indexOf('#') >= 0) {
					// convert from HEX
					var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(color);
					color = result ? {
						r: parseInt(result[1], 16),
						g: parseInt(result[2], 16),
						b: parseInt(result[3], 16),
						a: result[4] ? Number(result[4], 16) : 1
					} : null;
				} else {
					// given a color name like 'red' or 'green'
					console.log('');
					trace("ERROR: ColorUtils.toRgba does not accept color names such as '" + color + "'. Use HEX or an RGB/A string or object per documentation");
					trace("Returning the color '" + color + "' without any alpha");
					console.log('');
					return color;
				}
				break;
		}
		if (!color.a) color.a = 1;
		if (alpha >= 0) color.a = alpha;

		return color;
	}



	/**	
		@memberOf ColorUtils
		@method toRgbaString
		@param {string|object} color
			the color to convert, represented as a HEX string:"#ff0000", 
			an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
			or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		@param {number} alpha
			the optional alpha value for the return string: overrides the alpha value of an RGBA color. If undefined, will default to the alpha value of the color.
		@desc
			Returns the rgba() string representing a given color and optional alpha
	*/
	CU.toRgbaString = function(color, alpha) {
		var color = CU.toRgba(color, alpha);
		return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'
	}



	/**	
		@memberOf ColorUtils
		@method saturation
		@param {object} obj
			an object with paramaters for overall saturation, see Properties for more info
		@property {string|object} from
			the source color to saturate, represented as a HEX string:"#ff0000", 
			an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
			or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		@property {string|object} color
			synonymous with the from parameter
		@property {number} amount
			the total saturation of the from. 0 = grayscale, 1 = full, original color
		@property {string} format
			either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
			an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
		@desc
			Change the color saturation of a given color; returns either an 'rgba()' string or an rgba{} object
		@example
			// convert to full grayscale
			ColorUtils.saturation({
				from: '#99aa33',
				amount: 0,
				format: 'object'
			});
			// returns {r: 86, g: 86, b: 86, a: 1}
	*/
	CU.saturation = function(obj) {
		delete obj.to;
		obj = _convert(obj);

		var returnColors = {};
		for (var val in obj.from)
			if (val === 'a') {
				returnColors[val] = parseInt(obj.from[val]);
			} else {
				if (val === 'r') {
					var _high = 0;
					var _low = 255;
					for (var sub in obj.from) {
						if (parseInt(obj.from[sub]) > _high) _high = parseInt(obj.from[sub]);
						if (parseInt(obj.from[sub]) < _low) _low = parseInt(obj.from[sub]);
					}
				}
				returnColors[val] = Math.round((parseInt(obj.from[val]) * obj.amount) + ((1 - obj.amount) * ((_high + _low) / 2)));
			}

		return obj.format === 'object' ? returnColors : CU.toRgbaString(returnColors);
	}



	/**	
		@memberOf ColorUtils
		@method contrast
		@param {object} obj
			an object with paramaters for overall saturation, see Properties for more info
		@property {string|object} from
			the source color to begin with, represented as a HEX string:"#ff0000", an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.,
		@property {string|object} color
			synonymous with the from parameter
		@property {number} amount
			the contrast of the target. 0 = no contrast, 1 = original contrast, >1 = more and more, to infinity and beyond!
		@property {string|object} format
			either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
			an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
		@desc
			Change the contrast of the target; returns either an 'rgba()' string or an rgba{} object
		@example
			// get your whites whiter and brights brighter
			ColorUtils.contrast({
				from: '#aa0011'
				amount: 1.3,
				format: 'object'
			});
			// returns {r: 221, g: 0, b: 22, a: 1}
	*/
	CU.contrast = function(obj) {
		delete obj.to;
		obj = _convert(obj);

		var returnColors = {};
		for (var val in obj.from) returnColors[val] = (val === 'a') ? parseInt(obj.from[val]) : Math.round(parseInt(obj.from[val]) * obj.amount);

		return obj.format === 'object' ? returnColors : CU.toRgbaString(returnColors);
	}



	/**	
		@memberOf ColorUtils
		@method tint
		@param {object} obj
			an object with paramaters for overall saturation, see Properties for more info
		@property {string|object} from
			the source color to begin with, represented as a HEX string:"#ff0000", 
			an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
			or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		@property {string|object} color
			synonymous with the from parameter
		@property {string|object} to
			the target color to tint to, represented as a HEX string:"#ff0000", 
			an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
			or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		@property {number} amount
			the percentage of color to apply to the target. Defaults to 1, which is 100% color tinting
		@property {string|object} format
			either 'object' or 'string' - which determines whether to return an 'rgba()' string, 
			or an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
		@desc
			Tint a color uniformly to a given color; returns either an 'rgba()' string or an rgba{} object
		@example
			// tint to green
			ColorUtils.tint({
				from: '#ffff00',
				to: '#00ff00',
				amount: 1,
				format: 'object'
			});
			// returns {r: 0, g: 255, b: 0, a: 1 };
			(end)

			(start code)
			// tint 50% to green
			ColorUtils.tint({
				from: '#ffff00',
				to: '#00ff00',
				amount: 0.5
			});
			// returns 'rgba(128, 128, 0, 1)'
	*/
	CU.tint = function(obj) {
		obj = _convert(obj);

		var returnColors = {};
		for (var val in obj.from) returnColors[val] = (val === 'a') ? parseInt(obj.from[val]) : Math.round(parseInt(obj.from[val]) + ((parseInt(obj.to[val]) - parseInt(obj.from[val])) * obj.amount));

		return obj.format === 'object' ? returnColors : CU.toRgbaString(returnColors);
	}



	/**	
		@memberOf ColorUtils
		@method transform
		@param {object} obj
			an object with paramaters for overall saturation, see Properties for more info
		@property {string|object} from
			the source color to begin with, represented as a HEX string:"#ff0000", 
			an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
			or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		@property {string|object} color
			synonymous with the from parameter
		@property {string|object} to
			the target color to transform to, represented as a HEX string:"#ff0000", 
			an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
			or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		@property {number} amount
			the percentage of color to apply to the target. Defaults to 1, which is 100% color transform
		@property {string} format
			either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
			an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
		@returns {string|object} 
			either an 'rgba()' string or an rgba{} object
		@desc
			Color Transforms a color to another color by pulling colors out of original source; 
		@example
			// remove all colors but greens
			ColorUtils.transform({
				from: '#ffff00',
				to: '#00ff00',
				amount: 1,
				format: 'object'
			});
			// returns {r: 0, g: 255, b: 0, a: 1 };


			// remove all colors but greens
			ColorUtils.transform({
				from: '#ffff00',
				to: '#00ff00',
				amount: 1
			});
			// returns 'rgba(0, 255, 0, 1)'
	*/
	CU.transform = function(obj) {
		obj = _convert(obj);

		var returnColors = {};
		for (var val in obj.from) returnColors[val] = (val === 'a') ? parseInt(obj.from[val]) : Math.round(parseInt(obj.from[val]) - ((255 - parseInt(obj.to[val])) * obj.amount));

		return obj.format === 'object' ? returnColors : CU.toRgbaString(returnColors);
	}



	/**	
		@memberOf ColorUtils
		@method invert
		@param {object} obj
			an object with parameters for overall inversion, see Properties for more info
		@property {string|object} from
			the color to invert, represented as a HEX string:"#ff0000", 
			an RGB/A string: "rgb(255, 0, 0)" / "rgba(255, 0, 0, 1)" ), 
			or an RGB/A object: {r:255,g:0,b:0} / {r:255,g:0,b:0,a:1}.
		@property {string|object} color
			synonymous with the from parameter
		@property {string} format
			either 'object' or 'string' - which determines whether to return an 'rgba()' string or 
			an {r:, g:, b:, a:} object. If undefined, defaults to 'string'.
		@desc
			Invert the color; returns either an 'rgba()' string or an rgba{} object
		@example
			// invert and return result as object
			ColorUtils.invert({
				color: '#ff0000',
				format: 'object'
			});
			// returns {r: 0, g: 255, b: 255, a: 1 };

			// invert and return result as string
			ColorUtils.invert({
				color: '#ff0000'
			});
			// returns 'rgba(0, 255, 255, 1)'
	*/
	CU.invert = function(obj) {
		delete obj.to;
		delete obj.amount;
		obj = _convert(obj);

		var returnColors = {};
		for (var val in obj.from) returnColors[val] = (val === 'a') ? parseInt(obj.from[val]) : 255 - parseInt(obj.from[val]);

		return obj.format === 'object' ? returnColors : CU.toRgbaString(returnColors);
	}


	// PRIVATE FUNCTIONS
	// ------------------------------------------------------------------
	//
	function _convert(obj) {
		// if the provided color information is not already in the {r:, g:, b:, a:} object format, we must convert it to that
		obj.from = obj.from || obj.color;
		if (obj.from && typeof obj.from !== 'object') obj.from = ColorUtils.toRgba(obj.from);
		if (obj.to && typeof obj.to !== 'object') obj.to = ColorUtils.toRgba(obj.to);
		//
		obj.amount = obj.amount === undefined ? 1 : obj.amount;

		return obj;
	}
}