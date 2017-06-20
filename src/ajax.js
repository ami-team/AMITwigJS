/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-{{YEAR}} The AMI Team / LPSC / IN2P3
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

	dict: {},

	/*-----------------------------------------------------------------*/

	get: function(url, done, fail)
	{
		var txt;

		/*---------------------------------------------------------*/

		if(url in this.dict)
		{
			if(done)
			{
				done(this.dict[url]);
			}
		}

		/*---------------------------------------------------------*/

		if(typeof exports !== 'undefined')
		{
			/*-------------------------------------------------*/
			/* NODEJS                                          */
			/*-------------------------------------------------*/

			try
			{
				txt = this.dict[url] = amiTwig.fs.readFileSync(url, 'utf8');

				if(done)
				{
					done(txt);
				}
			}
			catch(err)
			{
				if(fail)
				{
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

			xmlHttpRequest.open('GET', url, false);
			xmlHttpRequest.send();

			/*-------------------------------------------------*/

			if(xmlHttpRequest.status === 200)
			{
				txt = this.dict[url] = xmlHttpRequest.responseText;

				if(done)
				{
					done(txt);
				}
			}
			else
			{
				txt = /**************/ xmlHttpRequest.responseText;

				if(fail)
				{
					fail(txt);
				}
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
