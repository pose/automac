#!/bin/bash

# Convert a note to html and output its result to stdout.

# Pre-reqs: jq

set -e

if [[ $# -ne 1 ]]; then
    >&2 echo "Error: invalid number of arguments.";
    >&2 echo "Usage:";
    >&2 echo "  $0 <note id>";
    exit 1;
fi

osacli=../dist/osacli
$osacli notes get-by-id "$1" | jq -r .body
