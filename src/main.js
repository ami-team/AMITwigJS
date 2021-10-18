/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-{{YEAR}} CNRS / LPSC
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/
/* amiTwig                                                                                                            */
/*--------------------------------------------------------------------------------------------------------------------*/

const amiTwig = {
	version: '{{TWIG_VERSION}}'
};

/*--------------------------------------------------------------------------------------------------------------------*/

/**/ if(typeof window !== 'undefined')
{
	window.amiTwig = amiTwig;
}
else if(typeof global !== 'undefined')
{
	global.amiTwig = amiTwig;
}

/*--------------------------------------------------------------------------------------------------------------------*/
