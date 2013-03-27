
dev:
	cp src/js/*.js www/js/ 2>/dev/null || :
	cp src/css/*.css www/css/ 2>/dev/null || :

clean:
	rm www/js/*.js 2>/dev/null || :
	rm www/css/*.css 2>/dev/null || :
