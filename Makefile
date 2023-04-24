all:
	mkdir -p dist

	./node_modules/grunt-cli/bin/grunt build

test: all
	node test/test.js

clean:
	rm -fr dist

.PHONY: all test clean
