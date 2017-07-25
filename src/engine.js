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

amiTwig.engine = {
	/*-----------------------------------------------------------------*/

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	/*-----------------------------------------------------------------*/

	_render: function(result, item, dict)
	{
		let k, l;

		let expression, list;

		let m, symb, expr, value;

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

				for(const i in item.blocks)
				{
					expression = item.blocks[i].expression;

					if(expression === '@root' || expression === '@else' || amiTwig.expr.cache.eval(expression, item.line, dict))
					{
						list = item.blocks[i].list;

						for(const j in list)
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

				for(const i in value)
				{
					dict[symb] = value[i];

					dict.loop.first = (k === (0 - 0));
					dict.loop.last = (k === (l - 1));

					dict.loop.index0 = k;
					k++;
					dict.loop.index = k;

					for(const j in list)
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
		const result = [];

		this._render(result, Object.prototype.toString.call(tmpl) === '[object String]' ? new amiTwig.tmpl.Compiler(tmpl).rootNode : tmpl, dict || {});

		return result.join('');
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
