/**
 * @npmpackage
 * @class MonetUtils
 * @desc
 * Monet utilities.
 * <codeblock>
 * import { MonetUtils } from 'ad-utils'
 * </codeblock>
 */

export function setData(integrator) {
	return integrator.ensureInitialized()
}

export function getDataByKey(key) {
	if (window.Monet) {
		return Monet.getFieldValue(key)
	}
	return null
}
