#!/bin/sh
thisdir=$(dirname $0)
pushd $thisdir
curl -O http://appium.s3.amazonaws.com/SauceDashboard.app.zip
curl -O http://appium.s3.amazonaws.com/SauceDashboard.apk
popd
