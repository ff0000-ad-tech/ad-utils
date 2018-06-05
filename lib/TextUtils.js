/* ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	TextUtils

	Description:
		This object contains methods necessary for manipulating text.
		<br>
		Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { TextUtils } from 'ad-utils'
		</codeblock>
		<br><br>
	---------------------------------------------------------------------------------------------------------------------------------------------------------- */

/* Method: addSpaces()
		Returns the specified number of '&nbsp;' strings.
		
	numberOfSpaces 			-	number of space entities to return */
export function addSpaces(numberOfSpaces) {
	let spacingString = ''
	for (let i = 0; i < numberOfSpaces; i++) {
		spacingString += '&nbsp;'
	}
	return spacingString
}

/* Method: getSpecialCharacter()
		Returns entity equivilent for specified character.
		
	requestedCharacter 		-	character must match the 'label' key 
	isCapital 				-	flag to return the entity as capital */
export function getSpecialCharacter(requestedCharacter, isCapital) {
	requestedCharacter = global.proxyStringToLowerCase.apply(requestedCharacter)
	for (let i = 0; i < specialCharacters.length; i++) {
		let currentLabel = global.proxyStringToLowerCase.apply(specialCharacters[i].label)

		if (currentLabel === requestedCharacter) return isCapital ? specialCharacters[i].upperCase : specialCharacters[i].lowerCase
	}
	return false
}

const specialCharacters = [
	{
		label: 'iexcl',
		upperCase: '&#161;',
		lowerCase: '&#161;'
	},
	{
		label: 'trademark',
		upperCase: '&#153;',
		lowerCase: '&#153;'
	},
	{
		label: 'copyright',
		upperCase: '&#169;',
		lowerCase: '&#169;'
	},
	{
		label: 'registered',
		upperCase: '&#174;',
		lowerCase: '&#174;'
	},
	{
		label: 'nTilde',
		upperCase: '&#209;',
		lowerCase: '&#241;'
	},
	{
		label: 'aAccent',
		upperCase: '&#193;',
		lowerCase: '&#225;'
	},
	{
		label: 'eAccent',
		upperCase: '&#201;',
		lowerCase: '&#233;'
	},
	{
		label: 'iAccent',
		upperCase: '&#205;',
		lowerCase: '&#237;'
	},
	{
		label: 'oAccent',
		upperCase: '&#211;',
		lowerCase: '&#243;'
	},
	{
		label: 'uAccent',
		upperCase: '&#218;',
		lowerCase: '&#250;'
	}
]

/* Method: trimStartAndEnd()
		Removes white space from the start and end of a string.
		
	target -	string to affect */
export function trimStartAndEnd(target) {
	return target ? target.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : ''
}

/* Method: removeSpaces()
		Removes all white space from the string.
		
	str 					-	string from which to remove spaces */
export function removeSpaces(str) {
	return str.split(' ').join('')
}

/*	Method: pad()

	Pads a number with zeros up to the specified number of places.

	_target				- number to be padded
	_count				- expected result length of the numerical string */
export function pad(_target, _count) {
	let _sign = ''
	if (_target < 0) _sign = '-'
	_target = _target.toString().replace(/\-/, '', _target)
	while (_target.length < _count) _target = '0' + _target
	return _sign + _target
}
