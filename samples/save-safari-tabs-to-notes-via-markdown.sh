#!/bin/bash

# Convert Safari notes to Markdown, then use pandoc to make them html and
# finally create a new note titled "Open Tabs".

# Pre-reqs: jq, pandoc

osacli=../dist/osacli

./safari-tabs-as-markdown.sh |\
    pandoc -f markdown -t html |\
    $osacli notes create "Open Tabs"
