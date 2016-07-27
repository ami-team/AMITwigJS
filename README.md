AMI-TWIG.js
===========

[AMI-TWIG.js](http://www.cern.ch/ami/twig/) is a JavaScript implementation of TWIG template engine for NodeJS and browsers.


Getting started
===============

### Loading AMI-Twig.js server-side:

```javascript
var amiTwig = require('ami-twig.min.js').amiTwig;
```

### Loading AMI-Twig.js client-side:

```javascript
<script type="text/javascript" src="ami-twig.min.js"></script>
```

### Using AMI-Twig.js:

```javascript
var htmlCode = amiTwig.engine.render(twigTemplate, optionalDict);
```

where **optionalDict** contains the global variables for the template.

For optimization perposes, templates can be compiled before rendering:

```javascript
var compiledTemplate = amiTwig.engine.compile(twigTemplate);

var htmlCode = amiTwig.engine.render(compiledTemplate, optionalDict);
```

License
=======

This Agreement is a Free Software license agreement that is the result
of discussions between its authors in order to ensure compliance with
the two main principles guiding its drafting:

 * firstly, compliance with the principles governing the distribution
   of Free Software: access to source code, broad rights granted to
   users,
 * secondly, the election of a governing law, French law, with which
   it is conformant, both as regards the law of torts and
   intellectual property law, and the protection that it offers to
   both authors and holders of the economic rights over software.

The authors of the CeCILL-C (for Ce[a] C[nrs] I[nria] L[ogiciel] L[ibre])
license are:

Commissariat à l'Energie Atomique - CEA, a public scientific, technical
and industrial research establishment, having its principal place of
business at 25 rue Leblanc, immeuble Le Ponant D, 75015 Paris, France.

Centre National de la Recherche Scientifique - CNRS, a public scientific
and technological establishment, having its principal place of business
at 3 rue Michel-Ange, 75794 Paris cedex 16, France.

Institut National de Recherche en Informatique et en Automatique -
INRIA, a public scientific and technological establishment, having its
principal place of business at Domaine de Voluceau, Rocquencourt, BP
105, 78153 Le Chesnay cedex, France.
