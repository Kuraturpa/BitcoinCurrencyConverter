
dev:
	cp src/js/*.js www/js/ 2>/dev/null || :
	cp src/css/*.css www/css/ 2>/dev/null || :
	cp -R src/lib www/lib

build:
	cp -R src/lib www/lib
	./compress.sh

clean:
	rm www/js/*.js 2>/dev/null || :
	rm www/css/*.css 2>/dev/null || :
	rm -R www/lib
