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

	_render: function(result, item, dict = {})
	{
		let m;

		let expression;

		this.dict = dict;

		switch(item.keyword)
		{
			/*-------------------------------------------------*/
			/* DO                                              */
			/*-------------------------------------------------*/

			case 'do':
			{
				/*-----------------------------------------*/

				amiTwig.expr.cache.eval(item.expression, item.line, dict);

				/*-----------------------------------------*/

				break;
			}

			/*-------------------------------------------------*/
			/* SET                                             */
			/*-------------------------------------------------*/

			case 'set':
			{
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
			}

			/*-------------------------------------------------*/
			/* @TEXT                                           */
			/*-------------------------------------------------*/

			case '@text':
			{
				/*-----------------------------------------*/

				result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

					return amiTwig.expr.cache.eval(expression, item.line, dict) || '';
				}));

				/*-----------------------------------------*/

				break;
			}

			/*-------------------------------------------------*/
			/* IF                                              */
			/*-------------------------------------------------*/

			case 'if':
			case '@root':
			{
				/*-----------------------------------------*/

				item.blocks.every((block) => {

					expression = block.expression;

					if(expression === '@true' || amiTwig.expr.cache.eval(expression, item.line, dict))
					{
						block.list.forEach((item) => {

							this._render(result, item, dict);
						});

						return false;
					}

					return true;
				});

				/*-----------------------------------------*/

				break;
			}

			/*-------------------------------------------------*/
			/* FOR                                             */
			/*-------------------------------------------------*/

			case 'for':
			{
				/*-----------------------------------------*/

				m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/)

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
				}

				/*-----------------------------------------*/

				const symb = m[1];
				const expr = m[2];

				/*-----------------------------------------*/

				let value = amiTwig.expr.cache.eval(expr, item.line, dict);

				/*-----------------------------------------*/

				const typeName = Object.prototype.toString.call(value);

				if(typeName === '[object Object]')
				{
					value = Object.keys(value);
				}
				else
				{
					if(typeName !== '[object Array]'
					   &&
					   typeName !== '[object String]'
					 ) {
						throw 'syntax error, line `' + item.line + '`, right operande not iterable';
					}
				}

				/*-----------------------------------------*/

				const old1 = dict[(symb)];
				const old2 = dict['loop'];

				/*-----------------------------------------*/

				let k = 0x0000000000;
				const l = value.length;

				dict.loop = {length: l};

				const list = item.blocks[0].list;

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

				dict['loop'] = old2;
				dict[(symb)] = old1;

				/*-----------------------------------------*/

				break;
			}

			/*-------------------------------------------------*/
			/* INCLUDE                                         */
			/*-------------------------------------------------*/

			case 'include':
			{
				/*-----------------------------------------*/

				let m_1_ = item.expression, with_subexpr, with_context;

				/**/ if((m = m_1_.match(/(.+)\s+with\s+(.+)\s+only$/)))
				{
					expression = m[1];
					with_subexpr = m[2];
					with_context = false;
				}
				else if((m = m_1_.match(/(.+)\s+with\s+(.+)$/)))
				{
					expression = m[1];
					with_subexpr = m[2];
					with_context = true;
				}
				else if((m = m_1_.match(/(.+)\s+only$/)))
				{
					expression = m[1];
					with_subexpr = '{}';
					with_context = false;
				}
				else
				{
					expression = m_1_;
					with_subexpr = '{}';
					with_context = true;
				}

				/*-----------------------------------------*/

				const fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

				if(Object.prototype.toString.call(fileName) !== '[object String]')
				{
					throw 'runtime error, line `' + item.line + '`, string expected';
				}

				/*-----------------------------------------*/

				const variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

				if(Object.prototype.toString.call(variables) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}

				/*-----------------------------------------*/

				result.push(amiTwig.stdlib.include(
					fileName,
					variables,
					with_context,
					false
				));

				/*-----------------------------------------*/

				break;
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	render: function(tmpl, dict = {})
	{
		const result = [];

		switch(Object.prototype.toString.call(tmpl))
		{
			case '[object String]':
				this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict);
				break;

			case '[object Object]':
				this._render(result, /*--------------*/tmpl/*--------------*/, dict);
				break;
		}

		return result.join('');
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
