/*!
 * AMI TWIG Engine
 *
 * Version: 0.1.0
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/
/* firebug                                                                 */
/*-------------------------------------------------------------------------*/

if(window.console && (window.console.firebug || window.console.exception))
{
	console.warning('AMI-Twig is slow with firebug');
}

/*-------------------------------------------------------------------------*/
/* amiTwig                                                                 */
/*-------------------------------------------------------------------------*/

var amiTwig = {};

/*-------------------------------------------------------------------------*/
/* exports.amiTwig                                                         */
/*-------------------------------------------------------------------------*/

if(typeof exports !== 'undefined')
{
	amiTwig.fs = require('fs');

	exports.amiTwig = amiTwig;
}

/*-------------------------------------------------------------------------*/
