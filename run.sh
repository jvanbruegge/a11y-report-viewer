DEBUG_LOG_PRETTY=true accessible-pipeline run $1 --ci --pageLimit 1 --ignoreFragmentLinks

reportFile=$(ls | grep "^report-")
stateFile=$(ls | grep "^state-")

echo $reportFile
echo $stateFile

cd parser
npm run start -- --inputFile "../$reportFile" --outputFile report.json
mv report.json ../report.json
cd ..

rm $reportFile
rm $stateFile

cd server
npm run start