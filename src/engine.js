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

	STACK_ITEM_IF_TRY_AGAIN: 0,
	STACK_ITEM_IF_TRUE_DONE: 1,
	STACK_ITEM_IF_TRUE_TODO: 2,
	STACK_ITEM_FOR: 3,
	STACK_ITEM_FILTER: 4,
	STACK_ITEM_0: 5,

	/*-----------------------------------------------------------------*/

	_newStackItem: function(type, symb, iter)
	{
		if(!symb) {
			symb = (null);
		}

		if(!iter) {
			iter = [null];
		}

		return {
			type: type,
			symb: symb,
			iter: iter,
		};
	},

	/*-----------------------------------------------------------------*/

	_hasToBeShown: function(stack)
	{
		/*---------------------------------------------------------*/

		var lastIndex = stack.length - 1;

		/*---------------------------------------------------------*/

		if(stack[lastIndex].type === this.STACK_ITEM_IF_TRY_AGAIN
		   ||
		   stack[lastIndex].type === this.STACK_ITEM_IF_TRUE_DONE
		 ) {
			return false;
		}

		/*---------------------------------------------------------*/

		for(var i = 0; i < lastIndex; i++)
		{
			if(stack[i].type === this.STACK_ITEM_IF_TRY_AGAIN)
			{
				return false;
			}
		}

		/*---------------------------------------------------------*/

		return true;
	},

	/*-----------------------------------------------------------------*/

	render: function(s, dict)
	{
		/*---------------------------------------------------------*/

		var result = '';

		/*---------------------------------------------------------*/
		/*                                                         */
		/*---------------------------------------------------------*/

		var stack = [this._newStackItem(this.STACK_ITEM_0)], lastStackItem;

		/*---------------------------------------------------------*/

		var m;
		var match;
		var keyword;
		var expression;

		/*---------------------------------------------------------*/

		var column_nr = 0;
		var COLUMN_NR = 0;

		var line = 1;

		/*---------------------------------------------------------*/

		var parts, symb, expr, i;

		/*---------------------------------------------------------*/
		/*                                                         */
		/*---------------------------------------------------------*/

		for(;; s = s.substr(COLUMN_NR))
		{
			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			lastStackItem = stack[stack.length - 1];

			/*-------------------------------------------------*/
			/*                                                 */
			/*-------------------------------------------------*/

			m = s.match(this.STATEMENT_RE);

			/*-------------------------------------------------*/

			if(m === null)
			{
				/*-----------------------------------------*/
				/* GET LINE NUMBER                         */
				/*-----------------------------------------*/

				for(i in s)
				{
					if(s[i] === '\n')
					{
						line++;
					}
				}

				/*-----------------------------------------*/
				/* GENERATE HTML                           */
				/*-----------------------------------------*/

				if(this._hasToBeShown(stack))
				{
					result += s.replace(this.VARIABLE_RE, function(match, expression) {

						return ami.twig.expr.interpreter.eval(
							new ami.twig.expr.Compiler(expression, line), dict
						);
					});
				}

				/*-----------------------------------------*/
				/* CHECK FOR NON-CLOSED BLOCKS             */
				/*-----------------------------------------*/

				var msg = [];

				for(i = 1; i < stack.length; i++)
				{
					var x = stack[i].type;

					/**/ if(x === this.STACK_ITEM_IF_TRY_AGAIN
					        ||
					        x === this.STACK_ITEM_IF_TRUE_DONE
					        ||
					        x === this.STACK_ITEM_IF_TRUE_TODO
					 ) {
					 	msg.push('missing keyword `endif`');
					 }
					 else if(x === this.STACK_ITEM_FOR)
					 {
					 	msg.push('missing keyword `endfor`');
					 }
					 else if(x === this.STACK_ITEM_FILTER)
					 {
					 	msg.push('missing keyword `endfilter`');
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

			match = m[0];
			keyword = m[1];
			expression = m[2];

			/*-------------------------------------------------*/
			/* GET POSITION AND LINE NUMBER                    */
			/*-------------------------------------------------*/

			column_nr = m.index + 0x0000000000;
			COLUMN_NR = m.index + match.length;

			for(i in match)
			{
				if(match[i] === '\n')
				{
					line++;
				}
			}

			/*-------------------------------------------------*/
			/* GENERATE HTML                                   */
			/*-------------------------------------------------*/

			if(this._hasToBeShown(stack))
			{
				var SYMB = lastStackItem.symb;
				var ITER = lastStackItem.iter;

				if(SYMB)
				{
					var DICT = {};

					for(i in dict)
					{
						DICT[i] = dict[i];
					}

					for(i in ITER)
					{
						DICT[SYMB] = ITER[i];

						result += s.substr(0, column_nr).replace(this.VARIABLE_RE, function(match, expression) {

							return ami.twig.expr.interpreter.eval(
								new ami.twig.expr.Compiler(expression, line), DICT
							);
						});
					}
				}
				else
				{
					result += s.substr(0, column_nr).replace(this.VARIABLE_RE, function(match, expression) {

						return ami.twig.expr.interpreter.eval(
							new ami.twig.expr.Compiler(expression, line), dict
						);
					});
				}
			}

			/*-------------------------------------------------*/
			/* SET KEYWORD                                     */
			/*-------------------------------------------------*/

			/**/ if(keyword === 'set')
			{
				/*-----------------------------------------*/

				parts = expression.split('=');

				/*-----------------------------------------*/

				symb = parts[0].trim();
				expr = parts[1].trim();

				var value = ami.twig.expr.interpreter.eval(new ami.twig.expr.Compiler(expr, line), dict);

				/*-----------------------------------------*/

				dict[symb] = value;

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
			/* IF KEYWORD                                      */
			/*-------------------------------------------------*/

			else if(keyword === 'if')
			{
				stack.push(this._newStackItem(ami.twig.expr.interpreter.eval(new ami.twig.expr.Compiler(expression, line), dict) ? this.STACK_ITEM_IF_TRUE_TODO : this.STACK_ITEM_IF_TRY_AGAIN));
			}

			/*-------------------------------------------------*/
			/* ELSEIF KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(keyword === 'elseif')
			{
				if(lastStackItem.type !== this.STACK_ITEM_IF_TRY_AGAIN
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_DONE
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_TODO
				 ) {
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				/**/ if(lastStackItem.type === this.STACK_ITEM_IF_TRY_AGAIN)
				{
					lastStackItem.type = ami.twig.expr.interpreter.eval(new ami.twig.expr.Compiler(expression, line), dict) ? this.STACK_ITEM_IF_TRUE_TODO : this.STACK_ITEM_IF_TRY_AGAIN;
				}
				else if(lastStackItem.type === this.STACK_ITEM_IF_TRUE_TODO)
				{
					lastStackItem.type = this.STACK_ITEM_IF_TRUE_DONE;
				}
			}

			/*-------------------------------------------------*/
			/* ELSE KEYWORD                                    */
			/*-------------------------------------------------*/

			else if(keyword === 'else')
			{
				if(lastStackItem.type !== this.STACK_ITEM_IF_TRY_AGAIN
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_DONE
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_TODO
				 ) {
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				/**/ if(lastStackItem.type === this.STACK_ITEM_IF_TRY_AGAIN)
				{
					lastStackItem.type = this.STACK_ITEM_IF_TRUE_TODO;
				}
				else if(lastStackItem.type === this.STACK_ITEM_IF_TRUE_TODO)
				{
					lastStackItem.type = this.STACK_ITEM_IF_TRUE_DONE;
				}
			}

			/*-------------------------------------------------*/
			/* ENDIF KEYWORD                                   */
			/*-------------------------------------------------*/

			else if(keyword === 'endif')
			{
				if(lastStackItem.type !== this.STACK_ITEM_IF_TRY_AGAIN
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_DONE
				   &&
				   lastStackItem.type !== this.STACK_ITEM_IF_TRUE_TODO
				 ) {
					throw 'syntax error, line `' + line + '`, missing keyword `if`';
				}

				stack.pop();
			}

			/*-------------------------------------------------*/
			/* FILTER KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(keyword === 'for')
			{
				/*-----------------------------------------*/

				parts = expression.split('in');

				/*-----------------------------------------*/

				symb = parts[0].trim();
				expr = parts[1].trim();

				var iter = ami.twig.expr.interpreter.eval(new ami.twig.expr.Compiler(expr, line), dict);

				/*-----------------------------------------*/

				if(!(iter instanceof Array)
				   &&
				   !(iter instanceof Object)
			           &&
				   !(typeof(iter) === 'string')
				 ) {
					throw 'runtime error, line `' + line + '`, `' + symb + '` must be iterable';
				}

				/*-----------------------------------------*/

				stack.push(this._newStackItem(this.STACK_ITEM_FOR, symb, iter));

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
			/* ENDFOR KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(keyword === 'endfor')
			{
				if(lastStackItem.type !== this.STACK_ITEM_FOR)
				{
					throw 'syntax error, line `' + line + '`, missing keyword `for`';
				}

				stack.pop();
			}

			/*-------------------------------------------------*/
			/* FILTER KEYWORD                                  */
			/*-------------------------------------------------*/

			else if(keyword === 'filter')
			{
				stack.push(this._newStackItem(this.STACK_ITEM_FILTER));
			}

			/*-------------------------------------------------*/
			/* ENDFILTER KEYWORD                               */
			/*-------------------------------------------------*/

			else if(keyword === 'endfilter')
			{
				if(lastStackItem.type !== this.STACK_ITEM_FILTER)
				{
					throw 'syntax error, line `' + line + '`, missing keyword `filter`';
				}

				stack.pop();
			}

			/*-------------------------------------------------*/
			/* UNKNOWN KEYWORD                                 */
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
};

/*-------------------------------------------------------------------------*/
