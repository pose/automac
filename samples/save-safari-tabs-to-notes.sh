#!/bin/bash

# List tabs from Safari, format them with jq to be HTML and then insert it as a
# new entry on the Notes app.

# Pre-reqs: jq

osacli=../dist/osacli

$osacli safari list-tabs |\
     jq -r '"<a href=\"" + .url + "\"> " + .name + "</a><br/>" ' |\
     $osacli notes create "Open Tabs from Safari"
