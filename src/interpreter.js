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
/* amiTwig.expr.interpreter                                                */
/*-------------------------------------------------------------------------*/

amiTwig.expr.interpreter = {
	/*---------------------------------------------------------------------*/

	_getJS: function(node)
	{
		let L;
		let x;
		let left;
		let right;
		let operator;

		switch(node.nodeType)
		{
			/*-------------------------------------------------------------*/
			/* LST                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.LST:
				/*---------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push(/*-----*/ this._getJS(node.list[i]));
				}

				/*---------------------------------------------------------*/

				return '[' + L.join(',') + ']';

			/*-------------------------------------------------------------*/
			/* DIC                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.DIC:
				/*---------------------------------------------------------*/

				L = [];
	
				for(const i in node.dict)
				{
					L.push(i + ':' + this._getJS(node.dict[i]));
				}

				/*---------------------------------------------------------*/

				return '{' + L.join(',') + '}';

			/*-------------------------------------------------------------*/
			/* FUN                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.FUN:
		 		/*---------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push(this._getJS(node.list[i]));
				}

			 	/*---------------------------------------------------------*/

				return node.nodeValue + '(' + L.join(',') + ')';

			/*-------------------------------------------------------------*/
			/* VAR                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.VAR:
				/*---------------------------------------------------------*/

				L = [];

				for(const i in node.list)
				{
					L.push('[' + this._getJS(node.list[i]) + ']');
				}

				/*---------------------------------------------------------*/

				return L.length > 0 ? node.nodeValue + L.join('') : node.nodeValue;

			/*-------------------------------------------------------------*/
			/* TERMINAL                                                    */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.TERMINAL:

				return node.nodeValue;

			/*-------------------------------------------------------------*/
			/* IS                                                          */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.IS:

				left = this._getJS(node.nodeLeft);

				switch(node.nodeRight.nodeType)
				{
					case amiTwig.expr.tokens.DEFINED:
						return 'amiTwig.stdlib.isDefined(' + left + ')';

					case amiTwig.expr.tokens.NULL:
						return 'amiTwig.stdlib.isNull(' + left + ')';

					case amiTwig.expr.tokens.EMPTY:
						return 'amiTwig.stdlib.isEmpty(' + left + ')';

					case amiTwig.expr.tokens.ITERABLE:
						return 'amiTwig.stdlib.isIterable(' + left + ')';

					case amiTwig.expr.tokens.EVEN:
						return 'amiTwig.stdlib.isEven(' + left + ')';

					case amiTwig.expr.tokens.ODD:
						return 'amiTwig.stdlib.isOdd(' + left + ')';

					default:
						throw 'internal error';
				}

			/*-------------------------------------------------------------*/
			/* IN                                                          */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.IN:

				if(node.nodeRight.nodeType !== amiTwig.expr.tokens.RANGE)
				{
					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return 'amiTwig.stdlib.isInObject(' + left + ',' + right + ')';
				}
				else
				{
					x = this._getJS(node.nodeLeft);

					left = node.nodeRight.nodeLeft.nodeValue;
					right = node.nodeRight.nodeRight.nodeValue;

					return 'amiTwig.stdlib.isInRange(' + x + ',' + left + ',' + right + ')';
				}

			/*-------------------------------------------------------------*/
			/* STARTS_WITH                                                 */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.STARTS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.startsWith(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/
			/* ENDS_WITH                                                   */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.ENDS_WITH:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.endsWith(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/
			/* MATCHES                                                     */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.MATCHES:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.match(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/
			/* RANGE                                                       */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.RANGE:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'amiTwig.stdlib.range(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/
			/* DOT                                                         */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.DOT:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				if(node.nodeValue[0] === '.')
				{
					return left + '.' + right;
				}
				else
				{
					return left + '[' + right + ']';
				}

			/*-------------------------------------------------------------*/
			/* FLDIV                                                       */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.FLDIV:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.floor(' + left + '/' + right + ')';

			/*-------------------------------------------------------------*/
			/* POWER                                                       */
			/*-------------------------------------------------------------*/

			case amiTwig.expr.tokens.POWER:

				left = this._getJS(node.nodeLeft);
				right = this._getJS(node.nodeRight);

				return 'Math.pow(' + left + ',' + right + ')';

			/*-------------------------------------------------------------*/

			default:
				/*---------------------------------------------------------*/
				/* UNIARY OPERATOR                                         */
				/*---------------------------------------------------------*/

				if(node.nodeLeft === null
				   &&
				   node.nodeRight !== null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return operator + '(' + this._getJS(node.nodeRight) + ')';
				}

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight === null
				 ) {
					operator = (node.nodeType !== amiTwig.expr.tokens.NOT) ? node.nodeValue : '!';

					return '(' + this._getJS(node.nodeLeft) + ')' + operator;
				}

				/*---------------------------------------------------------*/
				/* BINARY OPERATOR                                         */
				/*---------------------------------------------------------*/

				if(node.nodeLeft !== null
				   &&
				   node.nodeRight !== null
				 ) {
					switch(node.nodeType)
					{
						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.LOGICAL_OR:
							operator = '||';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.LOGICAL_AND:
							operator = '&&';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_OR:
							operator = '|';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_XOR:
							operator = '^';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.BITWISE_AND:
							operator = '&';
							break;

						/*-------------------------------------------------*/

						case amiTwig.expr.tokens.CONCAT:
							operator = '+';
							break;

						/*-------------------------------------------------*/

						default:
							operator = node.nodeValue;
							break;

						/*-------------------------------------------------*/
					}

					left = this._getJS(node.nodeLeft);
					right = this._getJS(node.nodeRight);

					return '(' + left + operator + right + ')';
				}

			/*-------------------------------------------------------------*/
		}

		/*-----------------------------------------------------------------*/
	},

	/*---------------------------------------------------------------------*/

	getJS: function(expr)
	{
		return '(function(_) { return ' + this._getJS(expr.rootNode) + '; })';
	},

	/*---------------------------------------------------------------------*/

	eval: function(expr, _)
	{
		if(!_) _ = {};

		return eval(this.getJS(expr)).call(_, _);
	},

	/*---------------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
