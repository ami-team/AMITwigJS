/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.engine                                                         */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Engine
 * @namespace ami/twig
 */

ami.twig.engine = {
	/*-----------------------------------------------------------------*/

	STATEMENT_RE: /\{\%\s*([a-zA-Z]+)\s*(.*?)\s*\%\}/m,

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	COMMENT_RE: /\{\#\s*(.*?)\s*\#\}/g,

	/*-----------------------------------------------------------------*/

	compile: function(s)
	{
		/*---------------------------------------------------------*/

		var result = {
			line: line,
			keyword: 'if',
			expression: '',
			blocks: [{
				expression: '@else',
				list: [],
			}],
			value: '',
		};

		/*---------------------------------------------------------*/

		var stack1 = [result];
		var stack2 = [0x0000];

		var item;

		/*---------------------------------------------------------*/

		var column_nr = 0;
		var COLUMN_NR = 0;

		var line = 1;

		var i;

		/*---------------------------------------------------------*/

		s = s.replace(this.COMMENT_RE, '');

		/*---------------------------------------------------------*/

		for(;; s = s.substr(COLUMN_NR))
		{
			/*-------------------------------------------------*/

			var curr = stack1[stack1.length - 1];
			var indx = stack2[stack2.length - 1];

			/*-------------------------------------------------*/

			var m = s.match(this.STATEMENT_RE);

			if(m === null)
			{
				/*-----------------------------------------*/

				for(i in s)
				{
					if(s[i] === '\n')
					{
						line++;
					}
				}

				/*-----------------------------------------*/

				curr.blocks[indx].list.push({
					line: line,
					keyword: '@text',
					expression: '',
					blocks: (([])),
					value: s,
				});

				/*-----------------------------------------*/

				var msg = [];

				for(i = stack1.length - 1; i > 0; i--)
				{
					/**/ if(stack1[i].keyword === 'if')
					{
					 	msg.push('missing keyword `endif`');
					}
					else if(stack1[i].keyword === 'for')
					{
					 	msg.push('missing keyword `endfor`');
					}
				}

				if(msg.length > 0)
				{
					throw 'syntax error, line `' + line + '`, ' + msg.join(', ');
				}

				/*-----------------------------------------*/

				return result;
			}

			/*-------------------------------------------------*/

			var match = m[0];
			var keyword = m[1];
			var expression = m[2];

			column_nr = m.index + 0x0000000000;
			COLUMN_NR = m.index + match.length;

			var value = s.substr(0, column_nr);
			var VALUE = s.substr(0, COLUMN_NR);

			for(i in VALUE)
			{
				if(VALUE[i] === '\n')
				{
					line++;
				}
			}

			/*-------------------------------------------------*/

			if(value)
			{
				item = {
					line: line,
					keyword: '@text',
					expression: (('')),
					blocks: (([])),
					value: value,
				}

				curr.blocks[indx].list.push(item);
			}

			/*-------------------------------------------------*/

			/**/ if(keyword === 'do'
			        ||
			        keyword === 'set'
			        ||
				keyword === 'include'
			 ) {
				item = {
					line: line,
					keyword: keyword,
					expression: expression,
					blocks: (([])),
					value: (('')),
				}

				curr.blocks[indx].list.push(item);
			}

			/*-------------------------------------------------*/

			else if(keyword === 'if'
			        ||
			        keyword === 'for'
			 ) {
				item = {
					line: line,
					keyword: keyword,
					blocks: [{
						expression: expression,
						list: [],
					}],
					value: '',
				}

				curr.blocks[indx].list.push(item);

				stack1.push(item);
				stack2.push(0x00);
			}

			/*-------------------------------------------------*/

			else if(keyword === 'elseif')
			{
				if(curr['keyword'] !== 'if')
				{
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				indx = curr.blocks.length;

				curr.blocks.push({
					expression: expression,
					list: [],
				});

				stack2[stack2.length - 1] = indx;
			}

			/*-------------------------------------------------*/

			else if(keyword === 'else')
			{
				if(curr['keyword'] !== 'if')
				{
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				indx = curr.blocks.length;

				curr.blocks.push({
					expression: '@else',
					list: [],
				});

				stack2[stack2.length - 1] = indx;
			}
			
			/*-------------------------------------------------*/

			else if(keyword === 'endif')
			{
				if(curr['keyword'] !== 'if')
				{
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				stack1.pop();
				stack2.pop();
			}

			/*-------------------------------------------------*/

			else if(keyword === 'endfor')
			{
				if(curr['keyword'] !== 'for')
				{
					throw 'syntax error, line `' + line + '`, missing keyword `for`';
				}

				stack1.pop();
				stack2.pop();
			}

			/*-------------------------------------------------*/

			else
			{
				throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	_render: function(result, item, dict)
	{
		var i, j, k, l;

		var expression, list;

		var m, symb, expr, DICT, value;

		/*---------------------------------------------------------*/
		/* DO                                                      */
		/*---------------------------------------------------------*/

		/**/ if(item.keyword === 'do')
		{
			ami.twig.expr.cache.eval(item.expression, item.line, dict);
		}

		/*---------------------------------------------------------*/
		/* SET                                                     */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'set')
		{
			/*-------------------------------------------------*/

			m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+=\s+(.+)/)

			if(!m)
			{
				throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
			}

			symb = m[1].trim();
			expr = m[2].trim();

			/*-------------------------------------------------*/

			value = ami.twig.expr.cache.eval(expr, item.line, dict);

			/*-------------------------------------------------*/

			dict[symb] = value;

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* @TEXT                                                   */
		/*---------------------------------------------------------*/

		else if(item.keyword === '@text')
		{
			result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

				value = ami.twig.expr.cache.eval(expression, item.line, dict);

				return (typeof value !== 'undefined' && value !== null) ? value : '';
			}));
		}

		/*---------------------------------------------------------*/
		/* IF                                                      */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'if')
		{
			for(i in item.blocks)
			{
				expression = item.blocks[i].expression;

				if(expression === '@else' || ami.twig.expr.cache.eval(expression, item.line, dict) === true)
				{
					list = item.blocks[i].list;

					for(j in list)
					{
						this._render(result, list[j], dict);
					}

					break;
				}
			}
		}

		/*---------------------------------------------------------*/
		/* FOR                                                     */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'for')
		{
			/*-------------------------------------------------*/

			m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/)

			if(!m)
			{
				throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
			}

			symb = m[1].trim();
			expr = m[2].trim();

			/*-------------------------------------------------*/

			value = ami.twig.expr.cache.eval(expr, item.line, dict);

			/*-------------------------------------------------*/

			var typeName = Object.prototype.toString.call(value);

			if(typeName !== '[object Array]'
			   &&
			   typeName !== '[object Object]'
			   &&
			   typeName !== '[object String]'
			 ) {
				throw 'syntax error, line `' + item.line + '`, right operande not iterable';
			}

			/*-------------------------------------------------*/

			if(typeName === '[object Object]')
			{
				value = Object.keys(value);
			}

			/*-------------------------------------------------*/

			DICT = {loop: {}}; for(i in dict) DICT[i] = dict[i];

			/*-------------------------------------------------*/

			k = 0x0000000000;
			l = value.length;

			list = item.blocks[0].list;

			for(i in value)
			{
				DICT[symb] = value[i];

				DICT['loop'].first = (k === (0 - 0));
				DICT['loop'].last  = (k === (l - 1));

				DICT['loop'].index  = k;
				DICT['loop'].length = l;

				k++;

				for(j in list)
				{
					this._render(result, list[j], DICT);
				}
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* INCLUDE                                                 */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'include')
		{
			/*-------------------------------------------------*/

			expression = item.expression;

			/*-------------------------------------------------*/

			var only_subexpr = null;

			expression = expression.trim();

			if((m = expression.match(/only$/)))
			{
				expression = expression.substr(expression, expression.length - m[0].length - 1);

				only_subexpr = true;
			}

			/*-------------------------------------------------*/

			var with_subexpr = null;

			expression = expression.trim();

			if((m = expression.match(/with\s+(([a-zA-Z_$]|{).*)$/)))
			{
				expression = expression.substr(expression, expression.length - m[0].length - 1);

				with_subexpr = m[1];
			}

			/*-------------------------------------------------*/

			var FILENAME = ami.twig.expr.cache.eval(expression, item.line, dict);

			if(Object.prototype.toString.call(FILENAME) !== '[object String]')
			{
				throw 'runtime error, line `' + item.line + '`, string expected';
			}

			/*-------------------------------------------------*/

			if(with_subexpr)
			{
				DICT = ami.twig.expr.cache.eval(with_subexpr, item.line, dict);

				if(Object.prototype.toString.call(DICT) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}
			}
			else
			{
				DICT = {};
			}

			if(!only_subexpr)
			{
				for(i in dict) DICT[i] = dict[i];
			}

			/*-------------------------------------------------*/

			ami.twig.ajax.get(
				FILENAME,
				function(data) {
					result.push(ami.twig.engine.render(data, DICT));
				},
				function(/**/) {
					throw 'runtime error, line `' + item.line + '`, could not open `' + FILENAME + '`';
				}
			);

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(tmpl, dict)
	{
		var result = [];

		this._render(result, Object.prototype.toString.call(tmpl) === '[object String]' ? this.compile(tmpl) : tmpl, dict);

		return result.join('');
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
