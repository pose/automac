#!/bin/bash

osacli=${osacli:-./osacli}

# TODO Delete args test
# TODO list args test
# TODO list folder args test
# etc.

function testCreateArguments {
    # Should fail with less than one argument
    $osacli notes create
    assertEquals 1 $?

    # Should fail with more than one argument
    $osacli notes create foo bar
    assertEquals 1 $?
}

function testNotes {
    newNote=$(echo "some content" | \
        $osacli notes create "Note For Testing")
    newNoteId=$(echo "$newNote" | jq -r '.id')

    $osacli notes delete "$newNoteId"
}

. $(which shunit2)

