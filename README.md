AMI-TWIG.js
===========

[AMI-TWIG.js](http://www.cern.ch/ami/twig/) is a JavaScript implementation of the [TWIG template engine](http://twig.sensiolabs.org/) for NodeJS and browsers.


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

where *optionalDict* contains the global variables for the template.

For optimization perposes, templates can be compiled before rendering:

```javascript
var compiledTemplate = amiTwig.engine.compile(twigTemplate);

var htmlCode = amiTwig.engine.render(compiledTemplate, optionalDict);
```

License
=======

CeCILL-C
