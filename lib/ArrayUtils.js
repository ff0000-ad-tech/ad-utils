/**
	@class ArrayUtils
	@desc
		This object contains additional methods for manipulating arrays.
*/
var ArrayUtils = new function() {

	var A = this;

	/** 
		@memberOf ArrayUtils
		@method combine
		@param {array} arr1
			first array
		@param {array} arr2
			second array appended to the first
		@desc
			A 'more friendly' concat function.
	*/
	A.combine = function(arr1, arr2) {
		return arr1.concat(arr2);
	}


	/** 
		@memberOf ArrayUtils
		@method copy
		@param {array} array
			the array to duplicate
		@desc
			Creates a unique duplicate of the given array.
	*/
	A.copy = function(array) {
		return array.slice();
	}


	/** 
		@memberOf ArrayUtils
		@method insertAt
		@param {array} array
			the array to modify
		@param {number} index
			the index to insert elements
		@param {arguments} arguments
			the elements to insert
		@desc
			Adds elements at a provided index. Returns a new array.
	*/
	A.insertAt = function(array, index) {
		var a = array.slice(0, index);
		var b = array.slice(index, array.length);
		var args = Array.prototype.slice.call(arguments);
		var values = args.slice(2, args.length);
		return a.concat(values).concat(b);
	}


	/**
		@memberOf ArrayUtils
		@method removeAt
		@param {array} array
			the array to modify
		@param {number} index
			the index of the element to remove
		@desc
			Removes an element at a provided index. Returns a new array.
	*/
	A.removeAt = function(array, index) {
		var a = A.copy(array);
		a.splice(index, 1);
		return a;
	}


	/**
		@memberOf ArrayUtils
		@method remove
		@param {array} array
			the array to modify
		@param {number|string} item
			the item to remove from the array
		@desc
			Removes all instances of an element from the given array. Returns a new array.
	*/
	A.remove = function(array, item) {
		var _returnArray = array.slice()
		while (_returnArray.indexOf(item) >= 0) _returnArray = A.removeAt(_returnArray, _returnArray.indexOf(item));
		return _returnArray;
	}


	/**
		@memberOf ArrayUtils
		@method shuffle
		@param {array} array
			the array to modify
		@desc
			Shuffles the array into a random order.
	*/
	A.shuffle = function(array) {
		return array.sort(function() {
			return (Math.random() < .5) ? 1 : -1;
		});
	}


	/**
		@memberOf ArrayUtils
		@method contains
		@param {array} array
			the array to check
		@param {number|string} item
			the item to check for in the array
		@desc
			Determines if a given array contains a given element. Returns a boolean.
	*/
	A.contains = function(array, item) {
		return array.indexOf(item) >= 0;
	}


}