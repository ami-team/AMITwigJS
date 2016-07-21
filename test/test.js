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

var amiTwig = require('../dist/ami-twig.js').amiTwig;

/*-------------------------------------------------------------------------*/

var dict = {
	t1: [1, 2, 3],
	t2: [98, 99, 100],
};

/*
console.log(amiTwig.engine.render('{% set a = 1 + 1 %}', dict));
console.log(amiTwig.engine.render('{% set b = {3:4} %}', dict));
console.log(amiTwig.engine.render('{{ a }}', dict));
console.log(amiTwig.engine.render('{{ b }}', dict));

console.log(amiTwig.engine.render('{{ 99 in t1 }}', dict));

console.log(amiTwig.engine.render('{{ 99 in t2 }}', dict));

console.log(amiTwig.engine.render('$$$ {{ max(t2) }}', dict));

console.log(amiTwig.engine.render('$$$ {{ min(1, 7, 3, 5) }}', dict));

console.log(amiTwig.engine.render('{{ "http://xyz.com/?a=12&b=55" | escape }}'));
console.log(amiTwig.engine.render('{{ "http://xyz.com/?a=12&b=55" | escape(\'url\') }}'));

console.log(amiTwig.engine.render('{% set b = [1, 2, 3] %}', dict));

console.log(amiTwig.engine.render('{{ min([1, 2, 3]) }}', dict));

console.log(amiTwig.engine.render('{{ min(t1) }}', dict));
console.log(amiTwig.engine.render('{{ min([1, 2, 3]) }}', dict));

console.log(amiTwig.engine.render('{% for i in t1 %} {{i}} {% endfor %}', dict));

console.log(amiTwig.engine.render('{% for i in t1 %} {% if i === 1 %} one {% else %} ??? {% endif %} {% endfor %}', dict));
*/
/*
console.log(amiTwig.engine.render('foo {% for i in t1 %} {% if i === 1 %} {% set a = 1 + 1 %} one {% else %} {{i}} {% endif %} {% endfor %} bar', dict));

console.log(amiTwig.engine.render('A {% if 1 === 2 - 1 %} foo {% set a = 1 + 1 %} {% else %} bar {% set a = 1 + 1 %} {% endif %} B', dict));

console.log(amiTwig.engine.render('{% for i in t1 %} {{i}} {% endfor %}', dict));

console.log(amiTwig.engine.render('||{% if true %} {% include \'test/template.html\' with {\'foo\': \'bar\'} %} {% endif %}||', dict));
*/

/*
console.log(amiTwig.engine.render('{% set b = [1, 2, 3] %}', dict));

console.log(amiTwig.engine.render('{{ b }}', dict));

console.log(amiTwig.engine.render('{% for i in "hello" %} {{i}} {% endfor %}', dict));

console.log(amiTwig.engine.render('{% for i in {"aa": 1, "bb": 3, "cc": 5} %} {{i}} {% endfor %}', dict));
*/
/*
console.log(amiTwig.engine.render('{# this is a comment #}{% for i in [4,5,6] %} {{i}} {% if loop.first %} (first) {% endif %} {% endfor %}', dict));

console.log(amiTwig.expr.cache.eval('t1', 1, dict));
console.log(amiTwig.expr.cache.eval('t1', 1, dict));

console.log(amiTwig.stdlib.replace('aaaa bb cccc dd', {'aa': 'AA', 'cc': 'CC'}));

console.log(amiTwig.stdlib.isEmpty(dict.hh));

console.log('----');

console.log(amiTwig.stdlib.isEmpty(null));
console.log(amiTwig.stdlib.isEmpty(false));
console.log(amiTwig.stdlib.isEmpty(''));
console.log(amiTwig.stdlib.isEmpty([]));
console.log(amiTwig.stdlib.isEmpty({}));

console.log(amiTwig.engine.render('{{ " <hr /> & \" | escape }}', dict));

console.log(amiTwig.engine.render('{{ " \\" \' \\n \\\\ " | escape("js") }}', dict));


console.log(amiTwig.engine.render('{{ "- 123 -" | match("/123/g") }}', dict));
*/

//console.log(amiTwig.expr.interpreter.getJS(new amiTwig.expr.Compiler('s | escape', 1)));

/*
console.log(amiTwig.stdlib.filter_merge([1,2], [3,4], [5,6]));

console.log(amiTwig.stdlib.filter_merge({'1': 2}, {'3': 4}, {'5': 6}));

console.log(amiTwig.stdlib.filter_merge('1,2', '3,4', '5,6'));
*/

console.log('-------');
console.log(amiTwig.engine.render('{{ random([1,2,3]) }}'));
console.log(amiTwig.engine.render('{{ random("azerty") }}'));
console.log(amiTwig.engine.render('{{ random(100) }}'));
console.log(amiTwig.engine.render('{{ random() }}'));

/*-------------------------------------------------------------------------*/
