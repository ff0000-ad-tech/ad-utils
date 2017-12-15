
export { default as DcsUtils } from './lib/DcsUtils'
export { default as LocationUtils } from './lib/LocationUtils'
export { default as MonetUtils } from './lib/MonetUtils'
export { default as MotionUtils } from './lib/MotionUtils'
export { default as TextUtils } from './lib/TextUtils'
export { default as NetUtils } from './lib/NetUtils'

// using a unifying module for modules w/ named exports
export { default as MathUtils } from './lib/MathUtils.all'

/* NOTE: DON'T import only "default" from ObjectUtils since the default
function is a reserved keyword. Importing into scope will likely cause
issues w/ code using the "default" keyword */
// import MathUtils from './lib/MathUtils.all'
import * as ObjectUtils from './lib/ObjectUtils'
import * as ColorUtils from './lib/ColorUtils'
import * as ArrayUtils from './lib/ArrayUtils'
import * as ImageUtils from './lib/ImageUtils'

export {
	ArrayUtils,
	ColorUtils,
	ImageUtils,
	MathUtils,
	ObjectUtils,
}