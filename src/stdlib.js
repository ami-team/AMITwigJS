/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.stdlib                                                         */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG StdLib
 * @namespace ami/twig/stdlib
 */

ami.twig.stdlib = {
	/*-----------------------------------------------------------------*/
	/* VARIABLES                                                       */
	/*-----------------------------------------------------------------*/

	isDefined: function(x)
	{
		return typeof(x) !== 'undefined';
	},

	/*-----------------------------------------------------------------*/

	isNull: function(x)
	{
		return x === null;
	},

	/*-----------------------------------------------------------------*/

	isEmpty: function(x)
	{
		return x === null || x === false || x === '' || x === [] || x === {};
	},

	/*-----------------------------------------------------------------*/

	isIterable: function(x)
	{
		return (x instanceof Array)
		       ||
		       (x instanceof Object)
		       ||
		       (typeof(x) === 'string')
		;
	},

	/*-----------------------------------------------------------------*/

	isEven: function(x)
	{
		return (x & 1) === 0;
	},

	/*-----------------------------------------------------------------*/

	isOdd: function(x)
	{
		return (x & 1) === 1;
	},

	/*-----------------------------------------------------------------*/
	/* ITERABLES                                                       */
	/*-----------------------------------------------------------------*/

	isInObject: function(x, y)
	{
		if(y instanceof Array
		   ||
		   typeof(y) === 'string'
		 ) {
		 	return y.indexOf(x) >= 0;
		}
		
		if(x instanceof Object)
		{
			return x in y;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	isInRange: function(x, x1, x2)
	{

		/**/ if(typeof(x1) === 'number'
		        &&
		        typeof(x2) === 'number'
		 ) {
			return ((((((((x))))))) >= (((((((x1))))))))
			       &&
			       ((((((((x))))))) <= (((((((x2))))))))
			;
		}
		else if(typeof(x1) === 'string' && x1.length === 1
		        &&
		        typeof(x2) === 'string' && x2.length === 1
		 ) {
			return (x.charCodeAt(0) >= x1.charCodeAt(0))
			       &&
			       (x.charCodeAt(0) <= x2.charCodeAt(0))
			;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	range: function(x1, x2, step)
	{
		var i;

		var result = [];

		if(!step)
		{
			step = 1;
		}

		/**/ if(typeof(x1) === 'number'
		        &&
		        typeof(x2) === 'number'
		 ) {
			for(i = (((((((x1))))))); i <= (((((((x2))))))); i += step)
			{
				result.push(/*---------------*/(i));
			}
		}
		else if(typeof(x1) === 'string' && x1.length === 1
		        &&
		        typeof(x2) === 'string' && x2.length === 1
		 ) {
			for(i = x1.charCodeAt(0); i <= x2.charCodeAt(0); i += step)
			{
				result.push(String.fromCharCode(i));
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
	/*-----------------------------------------------------------------*/

	startsWith: function(s1, s2)
	{
		var base = 0x0000000000000000000;

		return s1.indexOf(s2, base) === base;
	},

	/*-----------------------------------------------------------------*/

	endsWith: function(s1, s2)
	{
		var base = s1.length - s2.length;

		return s1.indexOf(s2, base) === base;
	},

	/*-----------------------------------------------------------------*/

	match: function(s, regex)
	{
		var len = regex.     length     ;
		var idx = regex.lastIndexOf('/');

		if(len < 2
		   ||
		   idx < 0
		   ||
		   regex.charAt(0) !== '/'
		 ) {
			throw 'invalid regular expression `' + regex + '`';
		}

		return new RegExp(
			regex.substring(0x1, idx + 0)
			,
			regex.substring(idx + 1, len)
		).test(s);
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	min: function()
	{
		return Math.min(arguments);
	},

	/*-----------------------------------------------------------------*/

	max: function()
	{
		return Math.max(arguments);
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
