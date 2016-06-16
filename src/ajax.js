/*
 * AMI TWIG Engine
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/
/* ami.twig.ajax                                                           */
/*-------------------------------------------------------------------------*/

/**
 * The AMI TWIG Ajax
 * @namespace ami/twig/ajax
 */

ami.twig.ajax = {
	/*-----------------------------------------------------------------*/

	ajax: function(fileName)
	{
		var result = {};

		var xmlHttpRequest = new XMLHttpRequest();

		xmlHttpRequest.onreadystatechange = function()
		{
			if(xmlHttpRequest.readyState === 0x4)
			{
				if(xmlHttpRequest.status === 200)
				{
					if(result.done) {
						result.done(xmlHttpRequest.responseText);
					}
				}
				else
				{
					if(result.fail) {
						result.fail(xmlHttpRequest.responseText);
					}
				}
			}
		};

		xmlHttpRequest.open('GET', fileName, true);
		xmlHttpRequest.send();

		return result;
	},

	/*-----------------------------------------------------------------*/
};

/*-------------------------------------------------------------------------*/
