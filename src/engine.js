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

	/*-----------------------------------------------------------------*/

	parse: function(s)
	{
		/*---------------------------------------------------------*/

		var result = {
			line: line,
			keyword: '@block',
			expression: '',
			blocks: [{
				expression: '@true',
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

			/**/ if(keyword === 'set'
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
		var i, j;
		var k, l;
		var list;
		var expression;

		var parts, symb, expr, DICT;

		/*---------------------------------------------------------*/
		/* SET                                                     */
		/*---------------------------------------------------------*/

		/**/ if(item.keyword === 'set')
		{
			/*-------------------------------------------------*/

			m = item.expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+=\s+(.+)/)

			if(!m)
			{
				throw 'syntax error, line `' + line + '`, invalid `set` statement';
			}

			symb = m[1].trim();
			expr = m[2].trim();

			/*-------------------------------------------------*/

			var value = ami.twig.expr.interpreter.eval(
				new ami.twig.expr.Compiler(expr, item.line), dict
			);

			/*-------------------------------------------------*/

			dict[symb] = value;

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
		/* @BLOCK                                                  */
		/*---------------------------------------------------------*/

		else if(item.keyword === '@block')
		{
			list = item.blocks[0].list;

			for(i in list)
			{
				this._render(result, list[i], dict);
			}
		}

		/*---------------------------------------------------------*/
		/* @TEXT                                                   */
		/*---------------------------------------------------------*/

		else if(item.keyword === '@text')
		{
			result[0] += item.value.replace(this.VARIABLE_RE, function(match, expression) {

				return ami.twig.expr.interpreter.eval(
					new ami.twig.expr.Compiler(expression, item.line), dict
				);
			});
		}

		/*---------------------------------------------------------*/
		/* IF                                                      */
		/*---------------------------------------------------------*/

		else if(item.keyword === 'if')
		{
			for(i in item.blocks)
			{
				expression = item.blocks[i].expression;

				if(expression === '@else' || ami.twig.expr.interpreter.eval(new ami.twig.expr.Compiler(expression, item.line), dict) === true)
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
				throw 'syntax error, line `' + line + '`, invalid `for` statement';
			}

			symb = m[1].trim();
			expr = m[2].trim();

			/*-------------------------------------------------*/

			var iter = ami.twig.expr.interpreter.eval(
				new ami.twig.expr.Compiler(expr, item.line), dict
			);

			var ITER = (iter instanceof Object) ? Object.keys(iter) : iter;

			/*-------------------------------------------------*/

			if(!(iter instanceof Array
			     ||
			     iter instanceof Object
			     ||
			     iter instanceof String || typeof iter === 'string'
			 )) {
				throw 'syntax error, line `' + line + '`, right operande not iterable';
			}

			/*-------------------------------------------------*/

			DICT = {loop: {}}; for(i in dict) DICT[i] = dict[i];

			/*-------------------------------------------------*/

			k = 0x000000000;
			l = ITER.length;

			list = item.blocks[0].list;

			for(i in ITER)
			{
				DICT[symb] = ITER[i];

				DICT['loop'].first = (k === (0 - 0));
				DICT['loop'].last = (k === (l - 1));

				DICT['loop'].index = k;
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

			var m;

			expression = item.expression;

			/*-------------------------------------------------*/

			var only_subexpr;

			expression = expression.trim();

			if((m = expression.match(/(only)$/)))
			{
				expression = expression.substr(expression, expression.length - m[0].length - 1);

				only_subexpr = m[1];
			}
			else
			{
				only_subexpr = null;
			}

			/*-------------------------------------------------*/

			var with_subexpr;

			expression = expression.trim();

			if((m = expression.match(/with\s+(([a-zA-Z_$]|{).*)$/)))
			{
				expression = expression.substr(expression, expression.length - m[0].length - 1);

				with_subexpr = m[1];
			}
			else
			{
				with_subexpr = null;
			}

			/*-------------------------------------------------*/

			var FILENAME = ami.twig.expr.interpreter.eval(
				new ami.twig.expr.Compiler(expression, item.line), dict
			);

			/*-------------------------------------------------*/

			if(with_subexpr)
			{
				DICT = ami.twig.expr.interpreter.eval(
					new ami.twig.expr.Compiler(with_subexpr, item.line), dict
				);

				if(!(DICT instanceof Object))
				{
					throw 'runtime error, line `' + item.line + '`, dictionary expected';
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
					result[0] += ami.twig.engine.render(data, DICT);
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

	render: function(s, dict)
	{
		var result = [''];

		this._render(result, this.parse(s), dict);

		return result[0];
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
