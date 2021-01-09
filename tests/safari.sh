#!/bin/bash

set -e

function extractWindowAndIndex {
    echo "$1" | jq '(.windowId|tostring) + "-" + (.index|tostring)'
}

result=$($osacli safari open-tab)
newTabId=$(extractWindowAndIndex "$result")

IFS=$'\n'
for tab in $($osacli safari list-tabs); do
    currentTabId=$(extractWindowAndIndex "$tab")
    if [[ "$newTabId" == "$currentTabId" ]]; then
        exit 0;
    fi
done

exit 99
