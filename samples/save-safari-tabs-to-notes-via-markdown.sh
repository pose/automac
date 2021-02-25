#!/bin/bash

# Convert Safari notes to Markdown, then use pandoc to make them html and
# finally create a new note titled "Open Tabs".

# Pre-reqs: jq, pandoc

automac=../automac

./safari-tabs-as-markdown.sh |\
    pandoc -f markdown -t html |\
    $automac notes create "Open Tabs"
