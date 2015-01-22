#!/bin/sh
cd ..
rm -rf build/npm
mkdir build/npm
git archive master -o build/npm/ng-annotate.tar --prefix=ng-annotate/
cd build/npm
tar xf ng-annotate.tar && rm ng-annotate.tar
cd ng-annotate/build
./build.sh
cd ../..
tar czf ng-annotate.tgz ng-annotate && rm -rf ng-annotate
