#!/bin/bash

osacli=${osacli:-./osacli}

# TODO Delete args test
# TODO list args test
# TODO list folder args test
# TODO test when permissions are not granted
# etc.

function testCreateArguments {
    # Should fail with less than one argument
    $osacli notes create
    assertEquals 1 $?

    # Should fail with more than one argument
    $osacli notes create foo bar
    assertEquals 1 $?
}

function testDeleteArguments {
    # Should fail with exit code 1 when passed less than one argument
    $osacli notes delete
    assertEquals 1 $?

    # Should fail with exit code 1 when passed more than one argument
    $osacli notes delete foo bar
    assertEquals 1 $?

    # Should fail with exit code 2 if the note does not exist
    $osacli notes delete foo
    assertEquals 2 $?
}

function testNotes {
    newNote=$(echo "some content" | \
        $osacli notes create "Note For Testing")
    newNoteId=$(echo "$newNote" | jq -r '.id')

    $osacli notes delete "$newNoteId"
}

. $(which shunit2)

