/*
 * AMI Twig Engine
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig.engine                                                                                                     */
/*--------------------------------------------------------------------------------------------------------------------*/

amiTwig.engine = {
	/*----------------------------------------------------------------------------------------------------------------*/

	VARIABLE_RE: /\{\{\s*(.*?)\s*\}\}/g,

	/*----------------------------------------------------------------------------------------------------------------*/

	_render: function(result, item, dict = {}, tmpls = {})
	{
		let m;

		let expression;

		this.dict = dict;
		this.tmpls = tmpls;

		switch(item.keyword)
		{
			/*--------------------------------------------------------------------------------------------------------*/
			/* DO                                                                                                     */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'do':
			{
				/*----------------------------------------------------------------------------------------------------*/

				amiTwig.expr.cache.eval(item.expression, item.line, dict);

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* SET                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'set':
			{
				/*----------------------------------------------------------------------------------------------------*/

				m = item.expression.match(/((?:[a-zA-Z_$][a-zA-Z0-9_$]*\.)*[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(.+)/);

				if(!m)
				{
					throw 'syntax error, line `' + item.line + '`, invalid `set` statement';
				}

				/*----------------------------------------------------------------------------------------------------*/

				const parts = m[1].split('.'), l = parts.length - 1;

				let parent, j;

				if(parts[0] === 'window'
				   ||
				   parts[0] === 'global'
				 ) {
					/**/ if(typeof window !== 'undefined') {
						parent = window;
					}
					else if(typeof global !== 'undefined') {
						parent = global;
					}
					else {
						throw 'internal error';
					}

					j = 1;
				}
				else
				{
					parent = dict;

					j = 0;
				}

				/*----------------------------------------------------------------------------------------------------*/

				for(var i = j; i < l; i++)
				{
					if(parent[parts[i]])
					{
						parent = parent[parts[i]];
					}
					else
					{
						throw 'runtime error, line `' + item.line + '`, `' + m[1] + '` not declared';
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				parent[parts[i]] = amiTwig.expr.cache.eval(m[2], item.line, dict);

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* @TEXT                                                                                                  */
			/*--------------------------------------------------------------------------------------------------------*/

			case '@text':
			{
				/*----------------------------------------------------------------------------------------------------*/

				result.push(item.value.replace(this.VARIABLE_RE, function(match, expression) {

					let value = amiTwig.expr.cache.eval(expression, item.line, dict);

					return value !== null && value !== undefined ? value : '';
				}));

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* IF                                                                                                     */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'if':
			case '@root':
			{
				/*----------------------------------------------------------------------------------------------------*/

				item.blocks.every((block) => {

					expression = block.expression;

					if(expression === '@true' || amiTwig.expr.cache.eval(expression, item.line, dict))
					{
						for(const i in block.list)
						{
							this._render(result, block.list[i], dict, tmpls);
						}

						return false;
					}

					return true;
				});

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* FOR                                                                                                    */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'for':
			{
				/*----------------------------------------------------------------------------------------------------*/

				let sym1;
				let sym2;
				let expr;

				m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*,\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

				if(!m)
				{
					m = item.blocks[0].expression.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s+in\s+(.+)/);

					if(!m)
					{
						throw 'syntax error, line `' + item.line + '`, invalid `for` statement';
					}
					else
					{
						sym1 = m[1];
						sym2 = null;
						expr = m[2];
					}
				}
				else
				{
					sym1 = m[1];
					sym2 = m[2];
					expr = m[3];
				}

				/*----------------------------------------------------------------------------------------------------*/

				const origValue = amiTwig.expr.cache.eval(expr, item.line, dict);

				const typeName = Object.prototype.toString.call(origValue);

				/*----------------------------------------------------------------------------------------------------*/

				let iterValue;

				if(typeName === '[object Object]')
				{
					iterValue = sym2 ? Object.entries(origValue)
					                 : Object.keys(origValue)
					;
				}
				else
				{
					iterValue = origValue;

					if(typeName !== '[object Array]'
					   &&
					   typeName !== '[object String]'
					 ) {
						throw 'syntax error, line `' + item.line + '`, right operande not iterable';
					}

					if(sym2)
					{
						throw 'syntax error, line `' + item.line + '`, right operande not an object';
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				const l = iterValue.length;

				if(l > 0)
				{
					let k = 0x00000000000000;

					const list = item.blocks[0].list;

					if(sym2)
					{
						/*--------------------------------------------------------------------------------------------*/

						const old1 = dict[(sym1)];
						const old2 = dict[(sym2)];
						const old3 = dict['loop'];

						/*--------------------------------------------------------------------------------------------*/

						dict.loop = {length: l, parent: dict['loop']};

						/*--------------------------------------------------------------------------------------------*/

						for(const [key, val] of iterValue)
						{
							dict[sym1] = key;
							dict[sym2] = val;

							dict.loop.first = (k === (0 - 0));
							dict.loop.last = (k === (l - 1));

							dict.loop.revindex0 = l - k;
							dict.loop.index0 = k;
							k++;
							dict.loop.revindex = l - k;
							dict.loop.index = k;

							for(const j in list)
							{
								this._render(result, list[j], dict, tmpls);
							}
						}

						/*--------------------------------------------------------------------------------------------*/

						dict['loop'] = old3;
						dict[(sym2)] = old2;
						dict[(sym1)] = old1;

						/*--------------------------------------------------------------------------------------------*/
					}
					else
					{
						/*--------------------------------------------------------------------------------------------*/

						const old1 = dict[(sym1)];
						const old2 = dict['loop'];

						/*--------------------------------------------------------------------------------------------*/

						dict.loop = {length: l, parent: dict['loop']};

						/*--------------------------------------------------------------------------------------------*/

						for(const val of iterValue)
						{
							dict[sym1] = val;

							dict.loop.first = (k === (0 - 0));
							dict.loop.last = (k === (l - 1));

							dict.loop.revindex0 = l - k;
							dict.loop.index0 = k;
							k++;
							dict.loop.revindex = l - k;
							dict.loop.index = k;

							for(const j in list)
							{
								this._render(result, list[j], dict, tmpls);
							}
						}

						/*--------------------------------------------------------------------------------------------*/

						dict['loop'] = old2;
						dict[(sym1)] = old1;

						/*--------------------------------------------------------------------------------------------*/
					}
				}
				else
				{
					if(item.blocks.length > 1)
					{
						const list = item.blocks[1].list;

						for(const j in list)
						{
							this._render(result, list[j], dict, tmpls);
						}
					}
				}

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
			/* INCLUDE                                                                                                */
			/*--------------------------------------------------------------------------------------------------------*/

			case 'include':
			{
				/*----------------------------------------------------------------------------------------------------*/

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

				/*----------------------------------------------------------------------------------------------------*/

				const fileName = amiTwig.expr.cache.eval(expression, item.line, dict) || '';

				if(Object.prototype.toString.call(fileName) !== '[object String]')
				{
					throw 'runtime error, line `' + item.line + '`, string expected';
				}

				/*----------------------------------------------------------------------------------------------------*/

				const variables = amiTwig.expr.cache.eval(with_subexpr, item.line, dict) || {};

				if(Object.prototype.toString.call(variables) !== '[object Object]')
				{
					throw 'runtime error, line `' + item.line + '`, object expected';
				}

				/*----------------------------------------------------------------------------------------------------*/

				result.push(amiTwig.stdlib.include(
					fileName,
					variables,
					with_context,
					false
				));

				/*----------------------------------------------------------------------------------------------------*/

				break;
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	},

	/*----------------------------------------------------------------------------------------------------------------*/

	render: function(tmpl, dict = {}, tmpls = {})
	{
		const result = [];

		switch(Object.prototype.toString.call(tmpl))
		{
			case '[object String]':
				this._render(result, new amiTwig.tmpl.Compiler(tmpl).rootNode, dict, tmpls);
				break;

			case '[object Object]':
				this._render(result, /*--------------*/tmpl/*--------------*/, dict, tmpls);
				break;
		}

		return result.join('');
	},

	/*----------------------------------------------------------------------------------------------------------------*/
};

/*--------------------------------------------------------------------------------------------------------------------*/
