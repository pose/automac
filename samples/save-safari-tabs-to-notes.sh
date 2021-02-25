#!/bin/bash

# List tabs from Safari, format them with jq to be HTML and then insert it as a
# new entry on the Notes app.

# Pre-reqs: jq

automac=../automac

$automac safari list-tabs |\
     jq -r '"<a href=\"" + .url + "\"> " + .name + "</a><br/>" ' |\
     $automac notes create "Open Tabs from Safari"
