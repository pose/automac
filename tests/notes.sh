#!/bin/bash

automac=${automac:-./automac}

# TODO Delete args test
# TODO list args test
# TODO list folder args test
# TODO test when permissions are not granted
# etc.

# TODO How to bail if this test fails
function testPermissions {
    $automac notes list > /dev/null
    assertNotEquals "Required permissions have not been granted" 3 $?
}

function testListArguments {
    # Should fail with one or more arguments
    $automac notes list foo
    assertEquals 1 $?
}

function testCreateArguments {
    # Should fail with less than one argument
    $automac notes create
    assertEquals 1 $?

    # Should fail with more than one argument
    $automac notes create foo bar
    assertEquals 1 $?
}

function testDeleteArguments {
    # Should fail with exit code 1 when passed less than one argument
    $automac notes delete
    assertEquals 1 $?

    # Should fail with exit code 1 when passed more than one argument
    $automac notes delete foo bar
    assertEquals 1 $?

    # Should fail with exit code 2 if the note does not exist
    $automac notes delete foo
    assertEquals 2 $?
}

function testNotes {
    newNote=$(echo "some content" | \
        $automac notes create "Note For Testing")
    newNoteId=$(echo "$newNote" | jq -r '.id')

    listOfNotes=$($automac notes list)

    assertContains "$newNoteId" "$(echo "$listOfNotes" | jq -r .id)"

    $automac notes delete "$newNoteId"
}

. $(which shunit2)

