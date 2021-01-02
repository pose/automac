#!/bin/bash

# Convert entries from the Notes app to html files and place the result on a
# `result` folder.

# Pre-reqs: jq, pandoc, iconv

set -e

if [[ $# -ne 1 ]]; then
    >&2 echo "Error: invalid number of arguments.";
    >&2 echo "Usage:";
    >&2 echo "  $0 <folder id>";
    exit 1;
fi

osacli=../dist/osacli
notesById="$($osacli notes list-folder-by-id "$1" | jq -r .id)"

# Taken from https://stackoverflow.com/questions/47050589/create-url-friendly-slug-with-pure-bash
slugify () {
    echo "$1" |\
        iconv -t ascii//TRANSLIT |\
        sed -r 's/[~\^]+//g' |\
        sed -r s/[^a-zA-Z0-9]+/-/g |\
        sed -r s/^-+\|-+$//g |\
        tr '[:upper:]' '[:lower:]'
}


outputDirectory=result
mkdir -p $outputDirectory

for noteId in $notesById; do
    note=$($osacli notes get-by-id "$noteId")
    name="$(echo "$note" | jq -r .name)"
    slug="$(slugify "$name")"
    pathname="$outputDirectory/$slug.html"
    body=$(echo "$note" | jq -r  '.body' | pandoc -f html-native_divs-native_spans -t html)
    echo "$body" > "$pathname"
done

