[![][License img]][License]
[![][MainRepo img]][MainRepo]
[![][AltRepo img]][AltRepo]

<a href="http://lpsc.in2p3.fr/" target="_blank">
	<img src="http://ami.in2p3.fr/docs/images/logo_lpsc.png" alt="LPSC" height="72" />
</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://www.in2p3.fr/" target="_blank">
	<img src="http://ami.in2p3.fr/docs/images/logo_in2p3.png" alt="IN2P3" height="72" />
</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://www.univ-grenoble-alpes.fr/" target="_blank">
	<img src="http://ami.in2p3.fr/docs/images/logo_uga.png" alt="UGA" height="72" />
</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://home.cern/" target="_blank">
	<img src="http://www.cern.ch/ami/images/logo_atlas.png" alt="CERN" height="72" />
</a>
&nbsp;&nbsp;&nbsp;&nbsp;
<a href="http://atlas.cern/" target="_blank">
	<img src="http://ami.in2p3.fr/docs/images/logo_cern.png" alt="CERN" height="72" />
</a>

AMI-TWIG.js
===========

[AMI-TWIG.js](http://www.cern.ch/ami/twig/) is a JavaScript implementation for both NodeJS and browsers of the [SensioLabs's TWIG template engine](http://twig.sensiolabs.org/).

Getting started
===============

### Loading AMI-Twig.js server-side:

```javascript
let amiTwig = require('ami-twig.min.js').amiTwig;
```

### Loading AMI-Twig.js client-side:

```javascript
<script type="text/javascript" src="ami-twig.min.js"></script>
```

### Using AMI-Twig.js:

```javascript
let textResult = amiTwig.engine.render(twigTemplate, optionalDict, optionalTwigTemplates);
```

where *optionalDict* contains all the global variables for the template.

For optimization perposes, templates can be compiled before rendering:

```javascript
let compiledTemplate = amiTwig.engine.compile(twigTemplate);

let textResult = amiTwig.engine.render(compiledTemplate, optionalDict, optionalTwigTemplates);
```

Developers
==========

* [Jérôme ODIER](https://annuaire.in2p3.fr/4121-4467/jerome-odier) ([CNRS/LPSC](http://lpsc.in2p3.fr/))

[License]:http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.txt
[License img]:https://img.shields.io/badge/license-CeCILL--C-blue.svg

[MainRepo]:https://gitlab.in2p3.fr/ami-team/AMITwigJS
[MainRepo img]:https://img.shields.io/badge/Main%20Repo-gitlab.in2p3.fr-success

[AltRepo]:https://github.com/ami-team/AMITwigJS
[AltRepo img]:https://img.shields.io/badge/Alt%20Repo-github.com-success
