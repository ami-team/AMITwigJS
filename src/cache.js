/*!
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* ami.twig.expr.cache                                                     */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG cache interpreter
 * @namespace ami/twig/expr/cache
 */

ami.twig.expr.cache = {
	/*-----------------------------------------------------------------*/

	dict: {},

	/*-----------------------------------------------------------------*/

	eval: function(expression, line, _)
	{
		var js;

		if(expression in this.dict)
		{
			js = this.dict[expression];
		}
		else
		{
			js = this.dict[expression] = ami.twig.expr.interpreter.getJS(
							new ami.twig.expr.Compiler(expression, line)
			);
		}

		/*---------------------------------------------------------*/

		if(!_) _ = {};

		return eval(js);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
