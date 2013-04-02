#/bin/bash

files=`basename src/js/*.js`

for i in $files;
do
	closure src/js/$i --js_output_file www/js/$i
done