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

[AMI-TWIG.js](http://www.cern.ch/ami/twig/) is a JavaScript implementation for NodeJS and browsers of the [SensioLabs's TWIG template engine](http://twig.sensiolabs.org/).


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

License
=======

Copyright or © or Copr. CNRS / IN2P3 / AMI Team (2017)

ami@lpsc.in2p3.fr

This software is a computer program whose purpose is to provide a JavaScript
implementation of the TWIG template engine.

This software is governed by the CeCILL-C license under French law and
abiding by the rules of distribution of free software.  You can  use, 
modify and/ or redistribute the software under the terms of the CeCILL-C
license as circulated by CEA, CNRS and INRIA at the following URL
"http://www.cecill.info". 

As a counterpart to the access to the source code and  rights to copy,
modify and redistribute granted by the license, users are provided only
with a limited warranty  and the software's author,  the holder of the
economic rights,  and the successive licensors  have only  limited
liability. 

In this respect, the user's attention is drawn to the risks associated
with loading,  using,  modifying and/or developing or reproducing the
software by the user in light of its specific status of free software,
that may mean  that it is complicated to manipulate,  and  that  also
therefore means  that it is reserved for developers  and  experienced
professionals having in-depth computer knowledge. Users are therefore
encouraged to load and test the software's suitability as regards their
requirements in conditions enabling the security of their systems and/or 
data to be ensured and,  more generally, to use and operate it in the 
same conditions as regards security. 

The fact that you are presently reading this means that you have had
knowledge of the CeCILL-C license and that you accept its terms.

[License]:http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.txt
[License img]:https://img.shields.io/badge/license-CeCILL--C-blue.svg

[MainRepo]:https://gitlab.in2p3.fr/ami-team/AMITwigJS
[MainRepo img]:https://img.shields.io/badge/Main%20Repo-gitlab.in2p3.fr-success

[AltRepo]:https://github.com/ami-team/AMITwigJS
[AltRepo img]:https://img.shields.io/badge/Alt%20Repo-github.com-success
