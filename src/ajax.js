/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
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
				var txt = ami.fs.readFileSync(fileName, 'utf8');

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
