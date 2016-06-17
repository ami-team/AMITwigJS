/*
 * AMI TWIG Engine
 *
 * Version: 0.1.0
 *
 * Copyright (c) 2014-2015 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

/*-------------------------------------------------------------------------*/

var ami = require('../dist/ami-twig.js').ami;

/*-------------------------------------------------------------------------*/

var dict = {
	t1: [1, 2, 3],
	t2: [98, 99, 100],
};

/*
console.log(ami.twig.engine.render('{% set a = 1 + 1 %}', dict));
console.log(ami.twig.engine.render('{% set b = {3:4} %}', dict));
console.log(ami.twig.engine.render('{{ a }}', dict));
console.log(ami.twig.engine.render('{{ b }}', dict));

console.log(ami.twig.engine.render('{{ 99 in t1 }}', dict));

console.log(ami.twig.engine.render('{{ 99 in t2 }}', dict));

console.log(ami.twig.engine.render('$$$ {{ max(t2) }}', dict));

console.log(ami.twig.engine.render('$$$ {{ min(1, 7, 3, 5) }}', dict));

console.log(ami.twig.engine.render('{{ "http://xyz.com/?a=12&b=55" | escape }}'));
console.log(ami.twig.engine.render('{{ "http://xyz.com/?a=12&b=55" | escape(\'url\') }}'));

console.log(ami.twig.engine.render('{% set b = [1, 2, 3] %}', dict));

console.log(ami.twig.engine.render('{{ min([1, 2, 3]) }}', dict));
*/
console.log(ami.twig.engine.render('||{% if true %} {% include \'test/template.html\' with {\'foo\': \'bar\'} %} {% endif %}||', dict));

/*-------------------------------------------------------------------------*/
