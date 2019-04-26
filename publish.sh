#! /usr/bin/env bash

red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

echo 'Performing jekyll build...'
jekyll build
if [[ $? -ne 0  ]]; then
    echo "${red}Failed Jekyll build.${reset}"
    exit
else
    echo "${green}Successful Jekyll build!${reset}"
fi

echo 'Entering _site dir'
cd _site

echo 'Publishing...'
#read -p 'Enter your alas username: ' USER
rsync -azP --exclude=.git --exclude=DONT_UPLOAD . risk@alas.matf.bg.ac.rs:/home/risk/public_html
if [[ $? -ne 0  ]]; then
    echo "${red}Failed publishing!${reset}"
    exit
else
    echo "${green}Successfully published!${reset}"
fi
