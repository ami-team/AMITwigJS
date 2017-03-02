/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-![VALUE YEAR] The AMI Team
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*-------------------------------------------------------------------------*/
/* amiTwig.expr.cache                                                      */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG cache interpreter
 * @namespace ami/twig/expr/cache
 */

amiTwig.expr.cache = {
	/*-----------------------------------------------------------------*/

	dict: {},

	/*-----------------------------------------------------------------*/

	eval: function(expression, line, _)
	{
		/*---------------------------------------------------------*/

		var f;

		if(expression in this.dict)
		{
			f = this.dict[expression];
		}
		else
		{
			f = this.dict[expression] = eval(amiTwig.expr.interpreter.getJS(
			                                         new amiTwig.expr.Compiler(expression, line)
			));
		}

		/*---------------------------------------------------------*/

		if(!_) _ = {};

		return f.call(_, _);

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
