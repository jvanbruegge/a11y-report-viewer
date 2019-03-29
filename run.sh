DEBUG_LOG_PRETTY=true accessible-pipeline run $1 --ci --pageLimit 1 --ignoreFragmentLinks

reportFile=$(ls | grep "^report-")
stateFile=$(ls | grep "^state-")

cd parser
npm run start -- --inputFile "../$reportFile" --outputFile report.json
mv report.json ../$2.json
cd ..

rm $reportFile
rm $stateFile