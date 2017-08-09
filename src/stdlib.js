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

amiTwig.stdlib = {
	/*-----------------------------------------------------------------*/
	/* VARIABLES                                                       */
	/*-----------------------------------------------------------------*/

	'isUndefined': function(x)
	{
		return x === undefined;
	},

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

	'isNotNull': function(x)
	{
		return x !== null;
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

		const typeName = Object.prototype.toString.call(x);

		return (typeName === '[object Array]' && x.length === 0)
		       ||
		       (typeName === '[object Object]' && Object.keys(x).length === 0)
		;
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
		const typeName = Object.prototype.toString.call(x);

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
			return (/*---*/x/*---*/ >= /*---*/x1/*---*/)
			       &&
			       (/*---*/x/*---*/ <= /*---*/x2/*---*/)
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

	'range': function(x1, x2, step = 1)
	{
		const result = [];

		/**/ if(this.isNumber(x1)
		        &&
		        this.isNumber(x2)
		 ) {
			for(let i = /*---*/x1/*---*/; i <= /*---*/x2/*---*/; i += step)
			{
				result.push(/*---------------*/(i));
			}
		}
		else if(this.isString(x1) && x1.length === 1
		        &&
		        this.isString(x2) && x2.length === 1
		 ) {
			for(let i = x1.charCodeAt(0); i <= x2.charCodeAt(0); i += step)
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
		if(arguments.length > 1)
		{
			/*-------------------------------------------------*/

			if(this.isString(arguments[0]))
			{
				const L = [];

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isString(item))
					{
						return null;
					}

					L.push(arguments[i]);
				}

				return L.join('');
			}

			/*-------------------------------------------------*/

			if(this.isArray(arguments[0]))
			{
				const L = [];

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isArray(item))
					{
						return null;
					}

					for(const j in item) L.push(item[j]);
				}

				return L;
			}

			/*-------------------------------------------------*/

			if(this.isObject(arguments[0]))
			{
				const D = {};

				for(const i in arguments)
				{
					const item = arguments[i];

					if(!this.isObject(item))
					{
						return null;
					}

					for(const j in item) D[j] = item[j];
				}

				return D;
			}

			/*-------------------------------------------------*/
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
			const base = 0x0000000000000000000;

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
			const base = s1.length - s2.length;

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
			const idx1 = regex.  indexOf  ('/');
			const idx2 = regex.lastIndexOf('/');

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
		return s1 || s2 || '';
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
		return this.isString(s) ? s.trim()
		                        : ''
		;
	},

	/*-----------------------------------------------------------------*/

	'_replace': function(s, oldStrs, newStrs)
	{
		const result = [];

		const l = (((s))).length;
		const m = oldStrs.length;
		const n = newStrs.length;

		if(m != n)
		{
			throw 'internal error';
		}

__l0:		for(let i = 0; i < l; i += 0)
		{
			const p = s.substring(i);

			for(let j = 0; j < m; j += 1)
			{
				if(p.indexOf(oldStrs[j]) === 0)
				{
					result.push(newStrs[j]);

					i += oldStrs[j].length;

					continue __l0;
				}
			}

			result.push(s.charAt(i++));
		}

		return result.join('');
	},

	/*-----------------------------------------------------------------*/

	'_textToHtmlX': ['&'    , '"'     , '<'   , '>'   ],
	'_textToHtmlY': ['&amp;', '&quot;', '&lt;', '&gt;'],

	/*-----------------------------------------------------------------*/

	'_textToStringX': ['\\'  , '\n' , '"'  , '\''  ],
	'_textToStringY': ['\\\\', '\\n', '\\"', '\\\''],

	/*-----------------------------------------------------------------*/

	'filter_escape': function(s, mode)
	{
		if(this.isString(s))
		{
			switch(mode || 'html')
			{
				case 'html':
				case 'html_attr':
					return this._replace(s, this._textToHtmlX, this._textToHtmlY);

				case 'js':
				case 'string':
					return this._replace(s, this._textToStringX, this._textToStringY);

				case 'url':
					return encodeURIComponent(s);

				default:
					return s;
			}
		}

		return '';
	},

	/*-----------------------------------------------------------------*/

	'filter_url_encode': function(s)
	{
		return this.isString(s) ? encodeURIComponent(s)
		                        : ''
		;
	},

	/*-----------------------------------------------------------------*/

	'filter_nl2br': function(s)
	{
		return this.isString(s) ? s.replace(/\n/g, '<br/>')
		                        : ''
		;
	},

	/*-----------------------------------------------------------------*/

	'filter_raw': function(s)
	{
		return this.isString(s) ? s
		                        : ''
		;
	},

	/*-----------------------------------------------------------------*/

	'filter_replace': function(s, dict)
	{
		return this.isString(s) && this.isObject(dict) ? this._replace(s, Object.keys(dict), Object.values(dict))
		                                               : ''
		;
	},

	/*-----------------------------------------------------------------*/

	'filter_split': function(s, sep, max)
	{
		return this.isString(s) ? s.split(sep, max)
		                        : []
		;
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
		switch(mode)
		{
			case 'ceil':
				return Math.ceil(x);

			case 'floor':
				return Math.floor(x);

			default:
				return Math.round(x);
		}
	},

	/*-----------------------------------------------------------------*/

	'min': function()
	{
		/*---------------------------------------------------------*/

		const args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                     : arguments
		;

		/*---------------------------------------------------------*/

		let result = Number.POSITIVE_INFINITY;

		for(const i in args)
		{
			if(!this.isNumber(args[i]))
			{
				return Number.NaN;
			}

			if(result > args[i])
			{
				result = args[i];
			}
		}

		/*---------------------------------------------------------*/

		return result;
	},

	/*-----------------------------------------------------------------*/

	'max': function()
	{
		/*---------------------------------------------------------*/

		const args = (arguments.length === 1) && (this.isArray(arguments[0]) || this.isObject(arguments[0])) ? arguments[0]
		                                                                                                     : arguments
		;

		/*---------------------------------------------------------*/

		let result = Number.NEGATIVE_INFINITY;

		for(const i in args)
		{
			if(!this.isNumber(args[i]))
			{
				return Number.NaN;
			}

			if(result < args[i])
			{
				result = args[i];
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
		const y = Math.random();

		if(x)
		{
			if(this.isArray(x)
			   ||
			   this.isObject(x)
			 ) {
			 	const X = Object.keys(x);

				return x[
					X[Math.floor(X.length * y)]
				];
			}

			if(this.isString(x))
			{
				return x[Math.floor(x.length * y)];
			}

			if(this.isNumber(x))
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
		return typeof JSPath !== 'undefined' ? JSPath.apply(path, x)
		                                     : []
		;
	},

	/*-----------------------------------------------------------------*/
	/* TEMPLATES                                                       */
	/*-----------------------------------------------------------------*/

	'include': function(fileName, variables = {}, withContext = true, ignoreMissing = false)
	{
		const temp = {};

		/*---------------------------------------------------------*/

		if(withContext)
		{
			for(const i in amiTwig.engine.dict)
			{
				temp[i] = amiTwig.engine.dict[i];
			}
		}

		if(variables)
		{
			for(const i in /*-*/variables/*-*/)
			{
				temp[i] = /*-*/variables/*-*/[i];
			}
		}

		/*---------------------------------------------------------*/

		let result = '';

		amiTwig.ajax.get(
			fileName,
			function(data)
			{
				result = amiTwig.engine.render(data, temp);
			},
			function(/**/)
			{
				if(!ignoreMissing)
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
