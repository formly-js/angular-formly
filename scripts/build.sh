#!/usr/bin/env bash
set -e

echo "-- Checking code --"
time npm run code-checks
echo "-- Code is good --"

echo "-- Running tests with coverage --"
time npm run test:single
echo "-- Tests complete --"

echo "-- Running minified tests --"
time npm run test:ci
echo "-- Minified tests passed --"

echo "-- Checking coverage thresholds --"
time npm run check-coverage
echo "-- Coverage looks good --"

echo "-- Reporting code coverage --"
cat ./coverage/lcov.info | node_modules/.bin/codecov
echo "-- Code coverage reported --"

echo "-- Building --"
time npm run build
echo "-- Build successful --"
