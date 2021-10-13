/*!
 * AMI Twig Engine
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
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

var amiTwig = {
	version: '1.1.0'
};

/*--------------------------------------------------------------------------------------------------------------------*/
/* exports.amiTwig                                                                                                    */
/*--------------------------------------------------------------------------------------------------------------------*/

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined')
{
	amiTwig.fs = require('fs');

	module.exports.amiTwig = amiTwig;
}

/*--------------------------------------------------------------------------------------------------------------------*/
