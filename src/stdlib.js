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

	'isDefined': function(x)
	{
		return typeof x !== 'undefined';
	},

	/*-----------------------------------------------------------------*/

	'isNull': function(x)
	{
		return x === null;
	},

	/*-----------------------------------------------------------------*/

	'isEmpty': function(x)
	{
		return (x === null || x === false) || (x === '' || x === [] || x === {});
	},

	/*-----------------------------------------------------------------*/

	'isNumber': function(x)
	{
		return x instanceof Number || typeof x === 'number';
	},

	/*-----------------------------------------------------------------*/

	'isString': function(x)
	{
		return x instanceof String || typeof x === 'string';
	},

	/*-----------------------------------------------------------------*/

	'isIterable': function(x)
	{
		return x instanceof Array
		       ||
		       x instanceof Object
		       ||
		       x instanceof String || typeof x === 'string'
		;
	},

	/*-----------------------------------------------------------------*/

	'isEven': function(x)
	{
		return this.isNumber(x) && (x & 1) === 0;
	},

	/*-----------------------------------------------------------------*/

	'isOdd': function(x)
	{
		return this.isNumber(x) && (x & 1) === 1;
	},

	/*-----------------------------------------------------------------*/
	/* ITERABLES                                                       */
	/*-----------------------------------------------------------------*/

	'isInObject': function(x, y)
	{
		if(y instanceof Array
		   ||
		   y instanceof String || typeof y === 'string'
		 ) {
		 	return y.indexOf(x) >= 0;
		}

		if(y instanceof Object)
		{
			return x in y;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'isInRange': function(x, x1, x2)
	{
		/**/ if(this.isNumber(x1)
		        &&
		        this.isNumber(x2)
		 ) {
			return ((((((((x))))))) >= (((((((x1))))))))
			       &&
			       ((((((((x))))))) <= (((((((x2))))))))
			;
		}
		else if(this.isString(x1) && x1.length === 1
		        &&
		        this.isString(x2) && x2.length === 1
		 ) {
			return (x.charCodeAt(0) >= x1.charCodeAt(0))
			       &&
			       (x.charCodeAt(0) <= x2.charCodeAt(0))
			;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'range': function(x1, x2, step)
	{
		var i;

		var result = [];

		if(!step)
		{
			step = 1;
		}

		/**/ if(this.isNumber(x1)
		        &&
		        this.isNumber(x2)
		 ) {
			for(i = (((((((x1))))))); i <= (((((((x2))))))); i += step)
			{
				result.push(/*---------------*/(i));
			}
		}
		else if(this.isString(x1) && x1.length === 1
		        &&
		        this.isString(x2) && x2.length === 1
		 ) {
			for(i = x1.charCodeAt(0); i <= x2.charCodeAt(0); i += step)
			{
				result.push(String.fromCharCode(i));
			}
		}

		return result;
	},

	/*-----------------------------------------------------------------*/

	'length': function(x)
	{
		return this.isIterable(x) ? x.length : 0;
	},

	/*-----------------------------------------------------------------*/

	'first': function(x)
	{
		return this.isIterable(x) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*-----------------------------------------------------------------*/

	'last': function(x)
	{
		return this.isIterable(x) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
	/*-----------------------------------------------------------------*/

	'default': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			return this.isEmpty(s1) === false ? s1 : s2;
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'startsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			var base = 0x0000000000000000000;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'endsWith': function(s1, s2)
	{
		if(this.isString(s1)
		   &&
		   this.isString(s2)
		 ) {
			var base = s1.length - s2.length;

			return s1.indexOf(s2, base) === base;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'match': function(s, regex)
	{
		if(this.isString(s)
		   &&
		   this.isString(regex)
		 ) {
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
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'lower': function(s)
	{
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'upper': function(s)
	{
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'escape': function(s, mode)
	{
		if(this.isString(s))
		{
			/**/ if(!mode
			        ||
				mode === 'html'
				||
				mode === 'html_attr'
			 ) {
				s = s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			}
			else if(mode === 'js')
			{
				s = s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\\"').replace(/'/g, '\\\'');
			}
			else if(mode === 'url')
			{
				s = encodeURIComponent(s);
			}
		}

		return s;
	},

	/*-----------------------------------------------------------------*/

	'raw': function(s)
	{
		return s;
	},

	/*-----------------------------------------------------------------*/

	'replace': function(s, dict)
	{
		if(this.isString(s) && dict instanceof Object)
		{
			var t = '';

			var i = 0x000000;
			var l = s.length;

			while(i < l)
			{
				for(var key in dict)
				{
					if(s.substring(i).indexOf(key) === 0)
					{
						t += dict[key];

						i += key.length;

						continue;
					}
				}

				t += s.charAt(i++);
			}

			return t;
		}

		return s;
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	'abs': function(x)
	{
		return Math.abs(x);
	},

	/*-----------------------------------------------------------------*/

	'min': function()
	{
		/*---------------------------------------------------------*/

		var args = (arguments.length === 1) && (arguments[0] instanceof Array || arguments[0] instanceof Object) ? arguments[0]
		                                                                                                         : arguments
		;

		/*---------------------------------------------------------*/

		var result = Number.POSITIVE_INFINITY;

		for(var i in args)
		{
			var arg = args[i];

			if(this.isNumber(arg) == false)
			{
				return Number.NaN;
			}

			if(result > arg)
			{
				result = arg;
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	'max': function()
	{
		/*---------------------------------------------------------*/

		var args = (arguments.length === 1) && (arguments[0] instanceof Array || arguments[0] instanceof Object) ? arguments[0]
		                                                                                                         : arguments
		;

		/*---------------------------------------------------------*/

		var result = Number.NEGATIVE_INFINITY;

		for(var i in args)
		{
			var arg = args[i];

			if(this.isNumber(arg) == false)
			{
				return Number.NaN;
			}

			if(result < arg)
			{
				result = arg;
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
