/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
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
		var js;

		if(expression in this.dict)
		{
			js = this.dict[expression];
		}
		else
		{
			js = this.dict[expression] = amiTwig.expr.interpreter.getJS(
							new amiTwig.expr.Compiler(expression, line)
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
