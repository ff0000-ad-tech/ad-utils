export { default as MotionUtils } from './lib/MotionUtils'

/* NOTE: DON'T import only "default" from ObjectUtils since the default
function is a reserved keyword. Importing into scope will likely cause
issues w/ code using the "default" keyword */
import * as ColorUtils from './lib/ColorUtils'
import * as MathUtils from './lib/MathUtils'
import * as ObjectUtils from './lib/ObjectUtils'
import * as TextUtils from './lib/TextUtils'

// Do not import DcsUtils by default because it does not get tree-shaken
// and its references to Enabler will cause DV360 to flag this as rich media.
//
// Instead, if you need it, import it directly in your build like:
//
//	import * as DcsUtils from '@ff0000-ad-tech/ad-utils/lib/DcsUtils.js'

export { ColorUtils, MathUtils, ObjectUtils, TextUtils }
