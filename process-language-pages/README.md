# Process the OLAC Language Pages

## Requirements
lxml: apt-get install python-lxml

## Producing language stats

Ensure data is up to date:
./run-all &
tail -f update.log

node create-report.js