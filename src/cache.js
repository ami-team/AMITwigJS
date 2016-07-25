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
