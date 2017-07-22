all:
	mkdir -p dist

	grunt build

test: all
	node test/test.js

clean:
	rm -fr dist

.PHONY: all test lint clean
