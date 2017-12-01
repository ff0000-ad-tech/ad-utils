/**
	@class ObjectUtils
	@desc
		Utilities for affecting objects.
*/
var ObjectUtils = new function () {
	var O = this;

	/**
		@memberOf ObjectUtils
		@name objectifier
		@property {function} objectifier.get
			{@link ObjectUtils.get}
		@property {function} objectifier.set
			{@link ObjectUtils.set}
		@desc
			This object is parent to a number of utility funcitons
	*/
	O.objectifier = {};



	/**
		@memberOf ObjectUtils
		@method get
		@param {string} str
			a data string representing the key of desire property splited by dot. 
			Array index is represented by number. For example, 'myObj.property1.0' means 
			I'm pointing to the [0] element in my propperty1 array inside of myObj. 
		@param {object} ctxObj
			the context object to find the property under, defaults to window
		@desc
			Gets a property with a nested property key string.
			<br><br>
			<b>NOTE!!!</b>
			This method is on the {@link ObjectUtils.objectifier} object!

		@example
			//
			var myObj = {
				prop1: [ 'a', 'b', 'c' ],
				prop2: {
					string: 'I am prop2',
					func: function() {
						alert( '!!' );
					}
				}
			};

			var val = ObjectUtils.objectifier.get( 'prop1.0', myObj );
			// your val should be 'a'

			val = ObjectUtils.objectifier.get( 'prop2.string', myObj );
			// your val should be 'I am prop2'
	*/
	O.objectifier.get = function( str, ctxObj ) {
		ctxObj = ctxObj || window;
		var splits = O.objectifier._getSplits( str ).splits;
		return O.objectifier._getProperty( splits, ctxObj );
	}



	/**
		@memberOf ObjectUtils
		@method set
		@param {string} str
			a data string representing the key of desire property splited by dot.
			Array index is represented by number. For example, 'myObj.property1.0' means
			I'm pointing to the [0] element in my propperty1 array inside of myObj.
		@param {any} val
			the value to set for th property
		@param {object} ctxObj
			the context object to find the property under, defaults to window
		@desc
			Sets a property value with a nested property key string.
			<br><br>
			<b>NOTE!!!</b>
			This method is on the {@link ObjectUtils.objectifier} object!
			
		@example
			//
			var myObj = {
				prop1: [ 'a', 'b', 'c' ],
				prop2: {
					string: 'I am prop2'
				}
			};

			ObjectUtils.objectifier.set( 'prop1.0', 123, myObj );
			// myObj.prop1[ 0 ] is now 123

			ObjectUtils.objectifier.set( 'prop2.string', 'hello', myObj );
			// myObj.prop2.string is now 'hello'
	*/
	O.objectifier.set = function( str, val, ctxObj ) {
		ctxObj = ctxObj || window;
		var splitData = O.objectifier._getSplits( str, true );
		var result = O.objectifier._getProperty( splitData.splits, ctxObj );
		result[ splitData.lastKey ] = val;
	}

	// objectifier._getSplits and objectifier._getProperty  are used internally for objectifier.get and objectifier.set
	O.objectifier._getSplits = function( str, popLast ) {
		var splits = str.split( '.' );
		var lastKey = popLast ? splits.pop() : null;
		
		return {
			splits: splits,
			lastKey: lastKey
		};
	}

	O.objectifier._getProperty = function( splits, obj ) {
		var result = obj || {};
		var i;
		var s;
		for( i=0; result && ( s = splits[ i ]); i++ ) {
			result = ( s in result ? result[ s ] : undefined );
		}
		return result;
	}

	

	/**
		@memberOf ObjectUtils
		@method clone
		@param {object} obj
			object to clone
		@returns {object}
			cloned object
		@desc
			Get a clone of an object without reference.
		@example
			//
			var oldObj = {
				a: 1,
				b: 2
			};

			var newObj = ObjectUtils.clone( oldObj );
			
			newObj.a = 'xyz';

			// oldObj.a is still 1
	*/
	O.clone = function( obj ) {
		if( Object.prototype.toString.call( obj ) !== '[object Object]' ) {
			return obj;
		}

		var result = obj.constructor();
		for( var key in obj ) {
			result[ key ] = O.clone( obj[ key ]);
		}

		return result;
	}



	/**
		@memberOf ObjectUtils
		@method objectDefault
		@param {object} obj
			an object contains custom properties to overide default properties
		@param {object} defaultObj
			an object contains properties to default to
		@param {boolean} recursive
			flag for if the property check should be executed recursively
			otherwise it will just be one level
		@desc
			Get an object using an object as a default, when a property doesn't in the object,
			it takes it from the default object if it exists. It also checks nested objects. 
			It is useful for setting up an object to store default values. 
		@example
			// our default object as a base set up
			var defaultObj = {
			    name: 'Person',
			    weight: 0,
			    age: 0,
			    gender: 'male',
			    locationDetail: {
			        state: 'CA',
			        city: 'Los Angeles'
			    }
			};
			
			// the custom object
			var customObj = {
			    name: 'Bob',
			    weight: 140,
			    age: 30,
			    locationDetail: {
			        city: 'Santa Monica',
			        street: 'Ocean Park'
			    }
			};

			var result = ObjectUtils.objectDefault( customObj, defaultObj, true );
			
			// your result object should look like
			{
				name: 'Bob',
			    weight: 140,
			    age: 30,
			    gender: 'male',
			    locationDetail: {
			        state: 'CA',
			        city: 'Santa Monica',
			        street: 'Ocean Park'
			    }
			}

			//if not recursive
			var result = ObjectUtils.objectDefault( customObj, defaultObj, false );

			// your result object should look like ( notice that it takes the whole locationDetail object )
			{
				name: 'Bob',
			    weight: 140,
			    age: 30,
			    gender: 'male',
			    locationDetail: {
			        city: 'Santa Monica',
			        street: 'Ocean Park'
			    }
			}
	*/
	O.default = function ( obj, defaultObj, recursive ) {
		obj = obj || {};
		
		var result = O.clone( obj );

		for( var key in defaultObj ) {
			var item = defaultObj[ key ];

			if( result[ key ] === undefined ) {

				result[ key ] = defaultObj[ key ];

			} else if( recursive ) {

				if( Object.prototype.toString.call( item ) === '[object Object]' ) {
					result[ key ] = O.default( result[ key ], item, recursive );
				}
			}
		}

		return result;
	}
}