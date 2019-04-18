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

/*-------------------------------------------------------------------------*/
/* amiTwig.tmpl                                                            */
/*-------------------------------------------------------------------------*/

amiTwig.tmpl = {};

/*-------------------------------------------------------------------------*/
/* amiTwig.tmpl.Compiler                                                   */
/*-------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler = function(tmpl) {

	this.$init(tmpl);
};

/*-------------------------------------------------------------------------*/

amiTwig.tmpl.Compiler.prototype = {
	/*---------------------------------------------------------------------*/

	STATEMENT_RE: /\{%\s*([a-zA-Z]+)\s+(.*?)\s*%\}/m,

	COMMENT_RE: /\{#\s*(.*?)\s*#\}/g,

	/*---------------------------------------------------------------------*/

	_count: function(s)
	{
		let result = 0;

		const l = s.length;

		for(let i = 0; i < l; i++)
		{
			if(s[i] === '\n') result++;
		}

		return result;
	},

	/*---------------------------------------------------------------------*/

	$init: function(tmpl)
	{
		/*-----------------------------------------------------------------*/

		let line = 1;

		let column;
		let COLUMN;

		/*-----------------------------------------------------------------*/

		this.rootNode = {
			line: line,
			keyword: '@root',
			expression: '',
			blocks: [{
				expression: '@true',
				list: [],
			}],
			value: '',
		};

		/*-----------------------------------------------------------------*/

		const stack1 = [this.rootNode];
		const stack2 = [0x00000000000];

		let item;

		/*-----------------------------------------------------------------*/

		for(tmpl = tmpl.replace(this.COMMENT_RE, '');; tmpl = tmpl.substr(COLUMN))
		{
			/*-------------------------------------------------------------*/

			const curr = stack1[stack1.length - 1];
			 let  indx = stack2[stack2.length - 1];

			/*-------------------------------------------------------------*/

			const m = tmpl.match(this.STATEMENT_RE);

			/*-------------------------------------------------------------*/

			if(m === null)
			{
				/*---------------------------------------------------------*/

				line += this._count(tmpl);

				/*---------------------------------------------------------*/

				curr.blocks[indx].list.push({
					line: line,
					keyword: '@text',
					expression: '',
					blocks: [],
					value: tmpl,
				});

				/*---------------------------------------------------------*/

				const errors = [];

				for(let i = stack1.length - 1; i > 0; i--)
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

				/*---------------------------------------------------------*/

				break;
			}

			/*-------------------------------------------------------------*/

			const match = m[0];
			const keyword = m[1];
			const expression = m[2];

			column = m.index + 0x0000000000;
			COLUMN = m.index + match.length;

			const value = tmpl.substr(0, column);
			const VALUE = tmpl.substr(0, COLUMN);

			/*-------------------------------------------------------------*/

			line += this._count(VALUE);

			/*-------------------------------------------------------------*/

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

			/*-------------------------------------------------------------*/

			switch(keyword)
			{
				/*---------------------------------------------------------*/

				case 'flush':
				case 'autoescape':
				case 'spaceless':
				case 'verbatim':

					/* IGNORE */

					break;

				/*---------------------------------------------------------*/

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

				/*---------------------------------------------------------*/

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

				/*---------------------------------------------------------*/

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

				/*---------------------------------------------------------*/

				case 'else':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `else`';
					}

					indx = curr.blocks.length;

					curr.blocks.push({
						expression: '@true',
						list: [],
					});

					stack2[stack2.length - 1] = indx;

					break;

				/*---------------------------------------------------------*/

				case 'endif':

					if(curr['keyword'] !== 'if')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endif`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*---------------------------------------------------------*/

				case 'endfor':

					if(curr['keyword'] !== 'for')
					{
						throw 'syntax error, line `' + line + '`, unexpected keyword `endfor`';
					}

					stack1.pop();
					stack2.pop();

					break;

				/*---------------------------------------------------------*/

				default:

					throw 'syntax error, line `' + line + '`, unknown keyword `' + keyword + '`';

				/*---------------------------------------------------------*/
			}

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	dump: function()
	{
		return JSON.stringify(this.rootNode, null, 2);
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
