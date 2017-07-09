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
/* amiTwig.engine                                                          */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Engine
 * @namespace ami/twig
 */

amiTwig.engine = {
	/*-----------------------------------------------------------------*/

	STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s+(.*?)\s*%\}/m,

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	COMMENT_RE: /\{#\s*(.*?)\s*#\}/g,

	/*-----------------------------------------------------------------*/

	compile: function(s)
	{
		/*---------------------------------------------------------*/

		var result = {
			line: line,
			keyword: '@root',
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

		for(s = s.replace(this.COMMENT_RE, '');; s = s.substr(COLUMN_NR))
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
					blocks: [],
					value: s,
				});

				/*-----------------------------------------*/

				var errors = [];

				for(i = stack1.length - 1; i > 0; i--)
				{
					/**/ if(stack1[i].keyword === 'if')
					{
						errors.push('missing keyword `endif`');
					}
					else if(stack1[i].keyword === 'for')
					{
					 	errors.push('missing keyword `endfor`');
					}
				}

				if(errors.length > 0)
				{
					throw 'syntax error, line `' + line + '`, ' + errors.join(', ');
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
					expression: '',
					blocks: [],
					value: value,
				}

				curr.blocks[indx].list.push(item);
			}

			/*-------------------------------------------------*/

			switch(keyword)
			{
				/*-----------------------------------------*/

				case 'flush':
				case 'autoescape':
				case 'spaceless':
				case 'verbatim':

					/* IGNORE */

					break;

				/*-----------------------------------------*/

				case 'do':
				case 'set':
				case 'include':

					item = {
						line: line,
						keyword: keyword,
						expression: expression,
						blocks: [],
						value: '',
					};

					curr.blocks[indx].list.push(item);

					break;

				/*-----------------------------------------*/

				case 'if':
				case 'for':

					item = {
						line: line,
						keyword: keyword,
						blocks: [{
							expression: expression,
							list: [],
						}],
						value: '',
					};

					curr.blocks[indx].list.push(item);

					stack1.push(item);
					stack2.push(0x00);

					break;

				/*-----------------------------------------*/

				case 'elseif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `elseif`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: expression,
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*-----------------------------------------*/

				case 'else':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: '@else',
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*-----------------------------------------*/

				case 'endif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*-----------------------------------------*/

				case 'endfor':

					if(curr['keyword'] !== 'for')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*-----------------------------------------*/

				default:

					throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';

				/*-----------------------------------------*/
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

		var m, symb, expr, value;

		this.dict = dict || {};

		switch(item.keyword)
		{
			/*-------------------------------------------------*/
			/* DO                                              */
			/*-------------------------------------------------*/

			case 'do':
				/*-----------------------------------------*/

				amiTwig.expr.cache.eval(item.expression, item.line, dict);

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* SET                                             */
			/*-------------------------------------------------*/

			case 'set':
				/*-----------------------------------------*/

				m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
				}

				/*-----------------------------------------*/

				dict[m[1]] = amiTwig.expr.cache.eval(m[2], item.line, dict);

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* @TEXT                                           */
			/*-------------------------------------------------*/

			case '@text':
				/*-----------------------------------------*/

				result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

					value = amiTwig.expr.cache.eval(expression, item.line, dict);

					return (value !== undefined && value !== null) ? value : '';
				}));

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* IF                                              */
			/*-------------------------------------------------*/

			case 'if':
			case '@root':
				/*-----------------------------------------*/

				for(i in item.blocks)
				{
					expression = item.blocks[i].expression;

					if(expression === '@else' || amiTwig.expr.cache.eval(expression, item.line, dict))
					{
						list = item.blocks[i].list;

						for(j in list)
						{
							this._render(result, list[j], dict);
						}

						break;
					}
				}

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* FOR                                             */
			/*-------------------------------------------------*/

			case 'for':
				/*-----------------------------------------*/

				m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
				}

				/*-----------------------------------------*/

				symb = m[1];
				expr = m[2];

				value = amiTwig.expr.cache.eval(expr, item.line, dict);

				/*-----------------------------------------*/

				var typeName = Object.prototype.toString.call(value);

				if(typeName !== '[object Array]'
				   &&
				   typeName !== '[object Object]'
				   &&
				   typeName !== '[object String]'
				 ) {
					throw 'syntax error, line `' + item.line + '`, right operande not iterable';
				}

				/*-----------------------------------------*/

				if(typeName === '[object Object]')
				{
					value = Object.keys(value);
				}

				/*-----------------------------------------*/

				var old1 = dict[(symb)];
				var old2 = dict['loop'];

				/*-----------------------------------------*/

				k = 0x0000000000;
				l = value.length;

				dict.loop = {length: l};

				list = item.blocks[0].list;

				for(i in value)
				{
					dict[symb] = value[i];

					dict.loop.first = (k === (0 - 0));
					dict.loop.last = (k === (l - 1));

					dict.loop.index0 = k;
					k++;
					dict.loop.index = k;

					for(j in list)
					{
						this._render(result, list[j], dict);
					}
				}

				/*-----------------------------------------*/

				if(old2) {
					dict['loop'] = old2;
				}

				if(old1) {
					dict[(symb)] = old1;
				}

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
			/* INCLUDE                                         */
			/*-------------------------------------------------*/

			case 'include':
				/*-----------------------------------------*/

				expression = item.expression;

				/*-----------------------------------------*/

				var with_context = true;

				expression = expression.trim();

				if((m = expression.match(/only$/)))
				{
					expression = expression.substr(expression, expression.length - m[0].length - 1);

					with_context = false;
				}

				/*-----------------------------------------*/

				var with_subexpr = '{}';

				expression = expression.trim();

				if((m = expression.match(/with\s+(.+)$/)))
				{
					expression = expression.substr(expression, expression.length - m[0].length - 1);

					with_subexpr = m[1];
				}

				/*-----------------------------------------*/

				var FILENAME = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

				if(Object.prototype.toString.call(FILENAME) !== '[object String]')
				{
					throw 'runtime error, line `' + item.line + '`, string expected';
				}

				/*-----------------------------------------*/

				var VARIABLES = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

				if(Object.prototype.toString.call(VARIABLES) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}

				/*-----------------------------------------*/

				result.push(amiTwig.stdlib.include(
					FILENAME,
					VARIABLES,
					with_context,
					false
				));

				/*-----------------------------------------*/

				break;

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(tmpl, dict)
	{
		var result = [];

		this._render(result, Object.prototype.toString.call(tmpl) === '[object String]' ? this.compile(tmpl) : tmpl, dict || {});

		return result.join('');
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
