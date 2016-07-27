all:
	mkdir -p dist

	cat src/main.js src/tokenizer.js src/compiler.js src/ajax.js src/engine.js src/cache.js src/stdlib.js src/interpreter.js > dist/ami-twig.js

	java -jar tool/yuicompressor-2.4.8.jar -o dist/ami-twig.min.js dist/ami-twig.js

test: all
	node test/test.js

lint: all
	eslint dist/ami-twig.js

clean:
	rm -fr dist


.PHONY: all test clean
