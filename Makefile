all:
	mkdir -p dist

	cat src/main.js src/tokenizer.js src/compiler.js src/engine.js src/stdlib.js src/interpreter.js > dist/ami-twig.js

	java -jar yuicompressor-2.4.8.jar -o dist/ami-twig.min.js dist/ami-twig.js

test:
	node test/test.js

clean:
	rm -fr dist


.PHONY: all test clean
