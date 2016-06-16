AMI TWIG
========

AMI-TWIG is a pure JavaScript and partial implementation of TWIG template engine.
Please see the official [documentation](http://twig.sensiolabs.org/documentation).

Implemented features
====================

__Tags__: for, if, include, set

__Filters__: abs, capitalize, default, escape, first, last, length, lower, raw, replace, trim, upper

__Functions__: min, max, range

__Tests__: constant, defined, empty, even, iterable, null, odd

__Operators__: in, is, +, -, /, %, //, *, **, and, or, not, (), b-and, b-xor, b-or, ==, !=, <, >, >=, <=, ===,
starts with, ends with, matches, []

Using AMI TWIG
==============

    <script type="text/javascript" src="ami-twig.js"></script>

    <script type="text/javascript">
    	var html_code = ami.twig.engine.render(twig_code, optional_dict);
    </script>
