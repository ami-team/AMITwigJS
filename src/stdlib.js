/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.stdlib                                                         */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG StdLib
 * @namespace ami/twig/stdlib
 */

amiTwig.stdlib = {
	/*-----------------------------------------------------------------*/
	/* VARIABLES                                                       */
	/*-----------------------------------------------------------------*/

	'isDefined': function(x)
	{
		return x !== undefined;
	},

	/*-----------------------------------------------------------------*/

	'isNull': function(x)
	{
		return x === null;
	},

	/*-----------------------------------------------------------------*/

	'isEmpty': function(x)
	{
		if(x === null
		   ||
		   x === false
		   ||
		   x === ((''))
		 ) {
		 	return true;
		}
		else
		{
			var typeName = Object.prototype.toString.call(x);

			return (typeName === '[object Array]' && x.length === 0)
			       ||
			       (typeName === '[object Object]' && Object.keys(x).length === 0)
			;
		}
	},

	/*-----------------------------------------------------------------*/

	'isNumber': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Number]';
	},

	/*-----------------------------------------------------------------*/

	'isString': function(x)
	{
		return Object.prototype.toString.call(x) === '[object String]';
	},

	/*-----------------------------------------------------------------*/

	'isArray': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Array]';
	},

	/*-----------------------------------------------------------------*/

	'isObject': function(x)
	{
		return Object.prototype.toString.call(x) === '[object Object]';
	},

	/*-----------------------------------------------------------------*/

	'isIterable': function(x)
	{
		var typeName = Object.prototype.toString.call(x);

		return typeName === '[object String]'
		       ||
		       typeName === '[object Array]'
		       ||
		       typeName === '[object Object]'
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
		if(this.isArray(y)
		   ||
		   this.isString(y)
		 ) {
		 	return y.indexOf(x) >= 0;
		}

		if(this.isObject(y))
		{
			return x in y;
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'isInRange': function(x, x1, x2)
	{
		if(this.isNumber(x1)
		   &&
		   this.isNumber(x2)
		 ) {
			return ((((((((x))))))) >= (((((((x1))))))))
			       &&
			       ((((((((x))))))) <= (((((((x2))))))))
			;
		}

		if(this.isString(x1) && x1.length === 1
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

	'filter_length': function(x)
	{
		if(this.isString(x)
		   ||
		   this.isArray(x)
		 ) {
		 	return x.length;
		}

		if(this.isObject(x))
		{
			return Object.keys(x).length;
		}

		return 0;
	},

	/*-----------------------------------------------------------------*/

	'filter_first': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[0x0000000000] : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_last': function(x)
	{
		return (this.isString(x) || this.isArray(x)) && x.length > 0 ? x[x.length - 1] : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_slice': function(x, idx1, idx2)
	{
		return (this.isString(x) || this.isArray(x)) ? x.slice(idx1, idx2) : null;
	},

	/*-----------------------------------------------------------------*/

	'filter_merge': function()
	{
		var i, j;

		if(arguments.length > 1)
		{
			if(this.isString(arguments[0]))
			{
				var s = '';

				for(i in arguments)
				{
					s += arguments[i];
				}

				return s;
			}

			if(this.isArray(arguments[0]))
			{
				var L = []

				for(i in arguments)
				{
					for(j in arguments[i])
					{
						L.push(arguments[i][j]);
					}
				}

				return L;
			}

			if(this.isObject(arguments[0]))
			{
				var D = {}

				for(i in arguments)
				{
					for(j in arguments[i])
					{
						D[j] = arguments[i][j];
					}
				}

				return D;
			}
		}

		return null;
	},

	/*-----------------------------------------------------------------*/

	'filter_sort': function(x)
	{
		return this.isArray(x) ? x.sort() : [];
	},

	/*-----------------------------------------------------------------*/

	'filter_reverse': function(x)
	{
		return this.isArray(x) ? x.reverse() : [];
	},

	/*-----------------------------------------------------------------*/

	'filter_join': function(x, sep)
	{
		return this.isArray(x) ? x.join(sep) : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_keys': function(x)
	{
		return this.isObject(x) ? Object.keys(x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* STRINGS                                                         */
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
		if(this.isString(((s)))
		   &&
		   this.isString(regex)
		 ) {
			var idx1 = regex.  indexOf  ('/');
			var idx2 = regex.lastIndexOf('/');

			if(idx1 === 0 || idx1 < idx2)
			{
				try
				{
					return new RegExp(regex.substring(idx1 + 1, idx2), regex.substring(idx2 + 1)).test(s);
				}
				catch(err)
				{
					/* IGNORE */
				}
			}
		}

		return false;
	},

	/*-----------------------------------------------------------------*/

	'filter_default': function(s1, s2)
	{
		/**/ if(s1)
		{
			return s1;
		}
		else if(s2)
		{
			return s2;
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_lower': function(s)
	{
		return this.isString(s) ? s.toLowerCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_upper': function(s)
	{
		return this.isString(s) ? s.toUpperCase() : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_capitalize': function(s)
	{
		if(this.isString(s))
		{
			return s.trim().toLowerCase().replace(/^\S/g, function(c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_title': function(s)
	{
		if(this.isString(s))
		{
			return s.trim().toLowerCase().replace(/(?:^|\s)\S/g, function(c) {

				return c.toUpperCase();
			});
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_trim': function(s)
	{
		return this.isString(s) ? s.trim() : '';
	},

	/*-----------------------------------------------------------------*/

	'_internal_escape_map1': {
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		'&': '&amp;',
	},

	/*-----------------------------------------------------------------*/

	'_internal_escape_map2': {
		'\\': '\\\\',
		'\n': '\\n',
		'\"': '\\\"',
		'\'': '\\\'',
	},

	/*-----------------------------------------------------------------*/

	'filter_escape': function(s, mode)
	{
		if(this.isString(s))
		{
			var _map;

			/**/ if(!
			        mode
			        ||
				mode === 'html'
				||
				mode === 'html_attr'
			 ) {
			 	_map = this._internal_escape_map1;

			 	return s.replace(/[<>"&]/g, function(s) {

					return _map[s];
				});
			}
			else if(mode === 'js')
			{
			 	_map = this._internal_escape_map2;

				return s.replace(/[\\\n"']/g, function(s) {

					return _map[s];
				});
			}
			else if(mode === 'url')
			{
				return encodeURIComponent(s);
			}
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_url_encode': function(s)
	{
		return this.isString(s) ? encodeURIComponent(s) : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_nl2br': function(s)
	{
		return this.isString(s) ? s.replace(/\n/g, '<br/>') : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_raw': function(s)
	{
		return this.isString(s) ? s : '';
	},

	/*-----------------------------------------------------------------*/

	'filter_replace': function(s, dict)
	{
		if(this.isString(s) && this.isObject(dict))
		{
			var q;

			var t = '';

			var i = 0x000000;
			var l = s.length;

			while(i < l)
			{
				q = true;

				for(var name in dict)
				{
					if(s.substring(i).indexOf(name) === 0)
					{
						t += dict[name];

						i += name.length;

						q = false;

						break;
					}
				}

				if(q)
				{
					t += s.charAt(i++);
				}
			}

			return t;
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_split': function(s, sep, max)
	{
		return this.isString(s) ? s.split(sep, max) : [];
	},

	/*-----------------------------------------------------------------*/
	/* NUMBERS                                                         */
	/*-----------------------------------------------------------------*/

	'filter_abs': function(x)
	{
		return Math.abs(x);
	},

	/*-----------------------------------------------------------------*/

	'filter_round': function(x, mode)
	{
		/**/ if(mode === 'ceil')
		{
			return Math.ceil(x);
		}
		else if(mode === 'floor')
		{
			return Math.floor(x);
		}
		else
		{
			return Math.round(x);
		}
	},

	/*-----------------------------------------------------------------*/

	'min': function()
	{
		/*---------------------------------------------------------*/

		var args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
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

		var args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
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
	/* RANDOM                                                          */
	/*-----------------------------------------------------------------*/

	'random': function(x)
	{
		var y = Math.random();

		if(x)
		{
			/**/ if(this.isString(x))
			{
				return x[Math.floor(x.length * y)];
			}
			else if(this.isArray(x))
			{
				return x[Math.floor(x.length * y)];
			}
			else if(this.isNumber(x))
			{
				return Math.floor(x * y);
			}
		}

		x = Number.MAX_SAFE_INTEGER;

		return Math.floor(x * y);
	},

	/*-----------------------------------------------------------------*/
	/* JSON                                                            */
	/*-----------------------------------------------------------------*/

	'filter_json_encode': function(x)
	{
		return JSON.stringify(x, null, 2);
	},

	/*-----------------------------------------------------------------*/

	'filter_json_jspath': function(x, path)
	{
		return typeof JSPath !== 'undefined' ? JSPath.apply(path, x) : [];
	},

	/*-----------------------------------------------------------------*/
	/* TEMPLATES                                                       */
	/*-----------------------------------------------------------------*/

	'include': function(fileName, variables, withContext, ignoreMissing)
	{
		/*---------------------------------------------------------*/

		var i;

		var temp = {};

		/*---------------------------------------------------------*/

		if(withContext) {
			for(i in amiTwig.engine.dict) temp[i] = amiTwig.engine.dict[i];
		}

		if(variables) {
			for(i in /**/ variables /**/) temp[i] = /**/ variables /**/[i];
		}

		/*---------------------------------------------------------*/

		var result = '';

		amiTwig.ajax.get(
			fileName,
			function(data)
			{
				result = amiTwig.engine.render(data, temp);
			},
			function(/**/)
			{
				if(ignoreMissing === false)
				{
					throw 'runtime error, could not open `' + fileName + '`';
				}
			}
		);

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/

amiTwig.stdlib.filter_e = amiTwig.stdlib.filter_escape;

/*-------------------------------------------------------------------------*/
