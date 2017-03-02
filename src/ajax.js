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
/* amiTwig.ajax                                                            */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Ajax
 * @namespace ami/twig/ajax
 */

amiTwig.ajax = {
	/*-----------------------------------------------------------------*/

	get: function(fileName, done, fail)
	{
		if(typeof exports !== 'undefined')
		{
			/*-------------------------------------------------*/
			/* NODEJS                                          */
			/*-------------------------------------------------*/

			try
			{
				var txt = amiTwig.fs.readFileSync(fileName, 'utf8');

				if(done) {
					done(txt);
				}
			}
			catch(err)
			{
				if(fail) {
					fail(err);
				}
			}

			/*-------------------------------------------------*/
		}
		else
		{
			/*-------------------------------------------------*/
			/* BROWSER                                         */
			/*-------------------------------------------------*/

			var xmlHttpRequest = new XMLHttpRequest();

			xmlHttpRequest.open('GET', fileName, false);
			xmlHttpRequest.send();

			/*-------------------------------------------------*/

			if(xmlHttpRequest.status === 200)
			{
				if(done) {
					done(xmlHttpRequest.responseText);
				}
			}
			else
			{
				if(fail) {
					fail(xmlHttpRequest.responseText);
				}
			}

			/*-------------------------------------------------*/
		}
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
