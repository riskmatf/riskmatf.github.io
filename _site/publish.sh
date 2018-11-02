#! /bin/sh

echo 'Performing jekyll build...'
jekyll build

echo 'Entering _site dir'
cd _site

echo 'Publishing...'
#read -p 'Enter your alas username: ' USER
rsync -azP --exclude=.git --exclude=DONT_UPLOAD . risk@alas.matf.bg.ac.rs:/home/risk/public_html
echo 'Published!'
