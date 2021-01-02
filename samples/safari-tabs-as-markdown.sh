#!/bin/bash

# Traverse Safari's windows and tabs then print them as markdown.

# Pre-reqs: jq

osacli=../dist/osacli

windows="$($osacli safari list-windows)"

# Setting IFS to \n to process newline-separated JSON correctly
IFS=$'\n'
for window in $windows; do
    windowId="$(echo "$window" | jq -r .id)"
    tabs=$($osacli safari list-tabs-by-window-id "$windowId")
    echo "## Window $windowId"
    echo
    for tab in $tabs; do
        echo "$tab" | jq -r '" * [" + .name + "](" + .url + ")"'
    done
    echo
done

