#!/bin/bash

# Traverse Safari's windows and tabs then print them as markdown.

# Pre-reqs: jq

automac=../dist/automac

windows="$($automac safari list-windows)"

# Setting IFS to \n to process newline-separated JSON correctly
IFS=$'\n'
for window in $windows; do
    windowId="$(echo "$window" | jq -r .id)"
    tabs=$($automac safari list-tabs-by-window-id "$windowId")
    echo "## Window $windowId"
    echo
    for tab in $tabs; do
        echo "$tab" | jq -r '" * [" + .name + "](" + .url + ")"'
    done
    echo
done

