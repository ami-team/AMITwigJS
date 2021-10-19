module.exports = function(grunt) {
	/*----------------------------------------------------------------------------------------------------------------*/

	const PACKAGE_JSON = grunt.file.readJSON("package.json");

	/*----------------------------------------------------------------------------------------------------------------*/

	const CURRENT_YEAR = grunt.template.today("yyyy");

	/*----------------------------------------------------------------------------------------------------------------*/

	const TWIG_VERSION = PACKAGE_JSON["version"];

	/*----------------------------------------------------------------------------------------------------------------*/

	const MINI_BANNER = `/*!
 * AMI Twig Engine
 *
 * Copyright © 2014-${CURRENT_YEAR} CNRS / LPSC
 *
 * Licensed under CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */`;

	/*----------------------------------------------------------------------------------------------------------------*/

	const BANNER = `/*!
 * AMI Twig Engine
 *
 * Copyright © 2014-${CURRENT_YEAR} CNRS/LPSC
 *
 * Author: Jérôme ODIER (jerome.odier@lpsc.in2p3.fr)
 *
 * Repositories: https://gitlab.in2p3.fr/ami-team/AMITwigJS/
 *               https://www.github.com/ami-team/AMITwigJS/
 *
 * This software is a computer program whose purpose is to provide a
 * JavaScript implementation of the SensioLabs's TWIG template engine.
 *
 * This software is governed by the CeCILL-C license under French law and
 * abiding by the rules of distribution of free software. You can use,
 * modify and/or redistribute the software under the terms of the CeCILL-C
 * license as circulated by CEA, CNRS and INRIA at the following URL
 * "http://www.cecill.info".
 *
 * The fact that you are presently reading this means that you have had
 * knowledge of the CeCILL-C license and that you accept its terms.
 *
 */`;


	/*----------------------------------------------------------------------------------------------------------------*/

	const browserslist = [
		">= 1%",
		"last 1 major version",
		"not dead",
		"Chrome >= 45",
		"Firefox >= 38",
		"Edge >= 12",
		"Explorer >= 10",
		"iOS >= 9",
		"Safari >= 9",
		"Android >= 4.4",
		"Opera >= 30"
	];

	grunt.log.writeln("Building AWF for: " + browserslist.join(", "));

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.initConfig({
		/*------------------------------------------------------------------------------------------------------------*/

		"pkg": grunt.file.readJSON("package.json"),

		/*------------------------------------------------------------------------------------------------------------*/

		"jsdoc": {
			"js": {
				"src": [
					"src/main.js",
					"src/tokenizer.js",
					"src/expression_compiler.js",
					"src/template_compiler.js",
					"src/engine.js",
					"src/cache.js",
					"src/date.js",
					"src/stdlib.js",
					"src/interpreter.js",
				],
				"dest": "doc"
			},
		},

		/*------------------------------------------------------------------------------------------------------------*/

		"concat": {
			"index": {
				"options": {
					"sourceMap": false,
					"stripBanners": false,

					"banner": BANNER + "\n\n",

					"process": function(src) {

						return src.replace(/{{CURRENT_YEAR}}/g, CURRENT_YEAR)
						          .replace(/{{TWIG_VERSION}}/g, TWIG_VERSION)
						          .replace(MINI_BANNER + "\n\n", "")
						;
					}
				},
				"src": [
					"src/main.js",
					"src/tokenizer.js",
					"src/expression_compiler.js",
					"src/template_compiler.js",
					"src/engine.js",
					"src/cache.js",
					"src/ajax.js",
					"src/stdlib.js",
					"src/interpreter.js",
				],
				"dest": "./index.js"
			},
			"dist": {
				"options": {
					"sourceMap": false,
					"stripBanners": false,

					"banner": BANNER + "\n\n" + "(function() {\n'use strict';\n\n", "footer": "})();",

					"process": function(src) {

						return src.replace("export default amiTwig;", "//export default amiTwig;")
						          .replace(/{{CURRENT_YEAR}}/g, CURRENT_YEAR)
						          .replace(/{{TWIG_VERSION}}/g, TWIG_VERSION)
						          .replace(MINI_BANNER + "\n\n", "")
						;
					}
				},
				"src": [
					"src/main.js",
					"src/tokenizer.js",
					"src/expression_compiler.js",
					"src/template_compiler.js",
					"src/engine.js",
					"src/cache.js",
					"src/ajax.js",
					"src/stdlib.js",
					"src/interpreter.js",
				],
				"dest": "dist/ami-twig.es6.js"
			}
		},

		/*------------------------------------------------------------------------------------------------------------*/

		"eslint": {
			"target": [
				"dist/ami-twig.es6.js"
			]
		},

		/*------------------------------------------------------------------------------------------------------------*/

		"babel": {
			"js": {
				"options": {
					"inputSourceMap": true,
					"sourceMaps": "inline",
					"compact": false,
					"minified": false,
					"shouldPrintComment": () => (txt) => /Copyright/.test(txt),
					"presets": [["@babel/preset-env", {
						"debug": false,
						"loose": true,
						"modules": false,
						"targets": {
							"browsers": browserslist
						}
					}]]
				},
				"files": {
					"dist/ami-twig.js": "dist/ami-twig.es6.js"
				}
			}
		},

		/*------------------------------------------------------------------------------------------------------------*/

		"uglify": {
			"dist": {
				"options": {
					"banner": BANNER,
					"compress": true
				},
				"files": {
					"dist/ami-twig.es6.min.js": "dist/ami-twig.es6.js",
					"dist/ami-twig.min.js": "dist/ami-twig.js"
				}
			}
		}

		/*------------------------------------------------------------------------------------------------------------*/
	});

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	/**/

	grunt.loadNpmTasks("grunt-jsdoc");
	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-babel");

	/*----------------------------------------------------------------------------------------------------------------*/

	grunt.registerTask("build", ["jsdoc", "concat", "eslint", "babel", "uglify"]);

	/*----------------------------------------------------------------------------------------------------------------*/
};
