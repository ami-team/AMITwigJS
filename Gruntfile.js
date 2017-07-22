module.exports = function(grunt) {
	/*-----------------------------------------------------------------*/

	var year = grunt.template.today("yyyy");

	/*-----------------------------------------------------------------*/

	grunt.initConfig({
		/*---------------------------------------------------------*/

		"pkg": grunt.file.readJSON("package.json"),

		/*---------------------------------------------------------*/

		"concat": {
			"src": {
				"options": {
					"banner": "'use strict';\n\n",

					"process": function(src) {

						return src.replace(/\'use strict\'\s*;\n*/g, "")
						          .replace(/\"use strict\"\s*;\n*/g, "")
						          .replace(/{{YEAR}}/g, year)
						;
					}
				},
				"src": [
					"src/main.js",
					"src/tokenizer.js",
					"src/compiler.js",
					"src/ajax.js",
					"src/engine.js",
					"src/cache.js",
					"src/stdlib.js",
					"src/interpreter.js",
				],
				"dest": "dist/ami-twig.es6.js"
			},
		},

		/*---------------------------------------------------------*/

		"eslint": {
			"target": [
				"dist/ami-twig.es6.js"
			]
		},

		/*---------------------------------------------------------*/

		"babel": {
			"dist": {
				"options": {
					"presets": ["babel-preset-es2015"]
				},
				"files": {
					"dist/ami-twig.js": "dist/ami-twig.es6.js"
				}
			}
		},

		/*---------------------------------------------------------*/

		"uglify": {
			"dist": {
				"options": {
					"banner": "/*!\n * AMI TWIG Engine\n *\n * Copyright (c) 2014-" + year + " The AMI Team / LPSC / IN2P3\n *\n * This file must be used under the terms of the CeCILL-C:\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html\n * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html\n *\n */\n",
					"compress": true
				},
				"files": {
					"dist/ami-twig.es6.min.js": "dist/ami-twig.es6.js",
					"dist/ami-twig.min.js": "dist/ami-twig.js"
				}
			}
		}

		/*---------------------------------------------------------*/
	});

	/*-----------------------------------------------------------------*/

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	/**/

	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-babel");

	/*-----------------------------------------------------------------*/

	grunt.registerTask("build", ["concat", "eslint", "babel", "uglify"]);

	/*-----------------------------------------------------------------*/
};
