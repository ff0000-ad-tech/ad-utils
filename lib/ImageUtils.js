/**
	@npmpackage
	@class ImageUtils
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { ImageUtils } from 'ad-utils'
		</codeblock>
		<br><br>
		
		This object contains methods necessary for manipulating images.
*/

/**
	@memberOf ImageUtils
	@method fitImageAtCoordinate
	@param {element} target
		The div with a background image
	@param {number} originX
		The x position to center on
	@param {number} originY
		The y position to center on
	@param {img} source
		Optional pass in a source img tag to skip the need to load to get source data
	@desc
		Positions a background image to fit the div size while centering around a point.  If the point is beyond the size bounds, it will align to that side.
*/
export function fitImageAtCoordinate(target, originX, originY, source) {
	var child
	if (originX === undefined && originY === undefined) {
		target.style.backgroundPosition = '50% 50%'
	} else {
		if (source) {
			child = source
			placement()
		} else {
			child = new Image()
			child.onload = placement
			child.src = target.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0]
		}
	}
	target.style.backgroundSize = 'cover'
	target.style.backgroundRepeat = 'no-repeat'

	function placement() {
		var parent = {
			width: target.offsetWidth,
			height: target.offsetHeight
		}
		var parentAspectRatio = parent.width / parent.height
		var childAspectRatio = child.width / child.height

		if (parentAspectRatio > childAspectRatio) {
			// child max fits in horizontal, move y
			fit('width', 'height')
		} else if (parentAspectRatio < childAspectRatio) {
			//  child max fits in vertical, move x
			fit('height', 'width')
		}

		function fit(a, b) {
			// child width is parent height times ratio of child width over child height
			// child height is parent width times ratio of child height over child width
			var childSize = parent[a] * (child[b] / child[a])

			// parent to child scale ratio
			var scalePercent = parent[a] / child[a]

			var coord = {
				width: originX || 0,
				height: originY || 0
			}
			// parent size, halfed then subtract the scaled coordinate point
			var childMove = parent[b] / 2 - coord[b] * scalePercent

			// make sure the image doesn't exceed the bounds
			var maxMove = parent[b] - childSize
			if (childMove > 0) childMove = 0
			else if (childMove < maxMove) childMove = maxMove

			target.style.backgroundPosition = a === 'height' ? childMove + 'px 0px' : '0px ' + childMove + 'px'
		}
	}
}
