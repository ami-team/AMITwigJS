/*!
 * AMI Twig Engine
 *
 * Copyright © 2014-{{CURRENT_YEAR}} CNRS / LPSC
 *
 * Licensed under CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig                                                                                                            */
/*--------------------------------------------------------------------------------------------------------------------*/

const amiTwig = {
	version: '{{TWIG_VERSION}}'
};

/*--------------------------------------------------------------------------------------------------------------------*/

/**/ if(typeof module === 'object' && typeof module.exports === 'object')
{
	module.exports.amiTwig = amiTwig;
}
else if(typeof window !== 'undefined')
{
	window.amiTwig = amiTwig;
}
else if(typeof global !== 'undefined')
{
	global.amiTwig = amiTwig;
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default amiTwig;

/*--------------------------------------------------------------------------------------------------------------------*/
