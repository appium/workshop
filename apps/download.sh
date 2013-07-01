#!/bin/sh
thisdir=$(dirname $0)
pushd $thisdir
curl -O http://appium.s3.amazonaws.com/SauceDashboard.app.zip
curl -O http://appium.s3.amazonaws.com/SauceDashboard.apk
curl -O http://appium.s3.amazonaws.com/TestApp6.1.app.zip
curl -O http://appium.s3.amazonaws.com/NotesList.apk
popd
