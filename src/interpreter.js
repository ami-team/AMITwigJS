/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.interpreter                                               */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG expression interpreter
 * @see An online <a href="http://cern.ch/ami/twig/" target="_blank">demo</a>.
 * @namespace ami/twig/expr/interpreter
 */

ami.twig.expr.interpreter = {
	/*-----------------------------------------------------------------*/

	_getJS: function(node)
	{
		var i;
		var x;
		var s;

		var left;
		var right;

		var operator;

		/*---------------------------------------------------------*/
		/* ARRAY, OBJECT, FUNCTIONS, VARIABLES, TERMINALS          */
		/*---------------------------------------------------------*/

		if(node.nodeLeft === null
		   &&
		   node.nodeRight === null
		 ) {
			if(node.list)
			{
			 	/*-----------------------------------------*/

				s = '';

				for(i in node.list)
				{
					s += ',' + this._getJS(node.list[i]);
				}

				if(s)
				{
					s = s.substr(1);
				}

			 	/*-----------------------------------------*/

				/**/ if(node.nodeType === ami.twig.expr.tokens.ARRAY)
				{
					return '[' + s + ']';
				}
				else if(node.nodeType === ami.twig.expr.tokens.FUNCTION)
				{
					return node.nodeValue + '(' + s + ')';
				}
				else if(node.nodeType === ami.twig.expr.tokens.VARIABLE)
				{
					return node.nodeValue + '[' + s + ']';
				}

			 	/*-----------------------------------------*/

				throw 'internal error';

			 	/*-----------------------------------------*/
			}

			if(node.dict)
			{
			 	/*-----------------------------------------*/

				s = '';

				for(i in node.dict)
				{
					s += ',' + i + ':' + this._getJS(node.dict[i]);
				}

				if(s)
				{
					s = s.substr(1);
				}

			 	/*-----------------------------------------*/

				/**/ if(node.nodeType === ami.twig.expr.tokens.OBJECT)
				{
					return '{' + s + '}';
				}

			 	/*-----------------------------------------*/

				throw 'internal error';

			 	/*-----------------------------------------*/
			}

			return node.nodeValue;
		}

		/*---------------------------------------------------------*/
		/* UNIARY OPERATORS                                        */
		/*---------------------------------------------------------*/

		if(node.nodeLeft !== null
		   &&
		   node.nodeRight === null
		 ) {
			operator = (node.nodeType !== ami.twig.expr.tokens.NOT) ? node.nodeValue : '!';

			return operator + '(' + this._getJS(node.nodeLeft) + ')';
		}

		if(node.nodeLeft === null
		   &&
		   node.nodeRight !== null
		 ) {
			operator = (node.nodeType !== ami.twig.expr.tokens.NOT) ? node.nodeValue : '!';

			return operator + '(' + this._getJS(node.nodeRight) + ')';
		}

		/*---------------------------------------------------------*/
		/* BINARY OPERATORS                                        */
		/*---------------------------------------------------------*/

		if(node.nodeLeft !== null
		   &&
		   node.nodeRight !== null
		 ) {
			switch(node.nodeType)
			{
				/*-----------------------------------------*/

				case ami.twig.expr.tokens.IS:

					left = this._getJS(node.nodeLeft);

					switch(node.nodeRight.nodeType)
					{
						case ami.twig.expr.tokens.DEFINED:
							return 'ami.twig.stdlib.isDefined(' + left + ')';

						case ami.twig.expr.tokens.NULL:
							return 'ami.twig.stdlib.isNull(' + left + ')';

						case ami.twig.expr.tokens.EMPTY:
							return 'ami.twig.stdlib.isEmpty(' + left + ')';

						case ami.twig.expr.tokens.ITERABLE:
							return 'ami.twig.stdlib.isIterable(' + left + ')';

						case ami.twig.expr.tokens.EVEN:
							return 'ami.twig.stdlib.isEven(' + left + ')';

						case ami.twig.expr.tokens.ODD:
							return 'ami.twig.stdlib.isOdd(' + left + ')';
					}

					throw 'internal error';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.IN:

					if(node.nodeRight.nodeType !== ami.twig.expr.tokens.RANGE)
					{
						left = this._getJS(node.nodeLeft);
						right = this._getJS(node.nodeRight);

						return 'ami.twig.stdlib.isInObject(' + left + ',' + right + ')';
					}
					else
					{
						x = this._getJS(node.nodeLeft);

						left = node.nodeRight.nodeLeft.nodeValue;
						right = node.nodeRight.nodeRight.nodeValue;

						return 'ami.twig.stdlib.isInRange(' + x + ',' + left + ',' + right + ')';
					}

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.STARTS:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.startsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.ENDS:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.endsWith(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.MATCHES:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.match(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.RANGE:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'ami.twig.stdlib.range(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.FLDIV:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'Math.floor(' + left + '/' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.POWER:

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'Math.pow(' + left + ',' + right + ')';

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.LOGICAL_OR:
					operator = '||';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.LOGICAL_AND:
					operator = '&&';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_OR:
					operator = '|';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_XOR:
					operator = '^';
					break;

				/*-----------------------------------------*/

				case ami.twig.expr.tokens.BITWISE_AND:
					operator = '&';
					break;

				/*-----------------------------------------*/

				default:
					operator = node.nodeValue;
					break;

				/*-----------------------------------------*/
			}

			left = this._getJS(node.nodeLeft);
			right = this._getJS(node.nodeRight);

			return '(' + left + operator + right + ')';
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Convert a compiled TWIG expression to JavaScript
	  * @param {String} expr the compiled expression
	  * @returns {String} The JavaScript result
	  */

	getJS: function(expr)
	{
		return this._getJS(expr.rootNode);
	},

	/*-----------------------------------------------------------------*/

	/**
	  * Evaluate the compiled TWIG expression
	  * @param {String} expr the compiled expression
	  * @param {Object} [dict] the dictionary of definitions
	  * @returns {?} The evaluated result
	  */

	eval: function(expr, _)
	{
		if(!_) _ = {};

		return eval(this._getJS(expr.rootNode));
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
