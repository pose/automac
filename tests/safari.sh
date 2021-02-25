#!/bin/bash

automac=${automac:-./automac}

# TODO How to bail if this test fails
function testPermissions {
    $automac safari list-tabs > /dev/null
    assertNotEquals "Required permissions have not been granted" 3 $?
}

# TODO list-tabs permissions
# TODO Validation for usage messages

function testListTabsArguments {
    # Should support not arguments
    $automac safari list-tabs > /dev/null
    assertEquals 0 $?

    # Should fail otherwise
    $automac safari list-tabs foo
    assertEquals 1 $?
}

function extractWindowAndIndex {
    jq -r '(.windowId|tostring) + " " + (.index|tostring)'
}

function testCloseTabArguments {
    # Error code 1
    # Should not support passing no-arguments
    $automac safari close-tab
    assertEquals 1 $?

    # Should not support passing one argument
    $automac safari close-tab foo
    assertEquals 1 $?

    # Should not support passing three arguments
    $automac safari close-tab foo bar baz
    assertEquals 1 $?

    # Error code 2
    # Should fail if the window/tab combination doesn't exist
    $automac safari close-tab foo bar
    assertEquals 2 $?
}
function testNewTabArguments {
    # Should support passing an url as first argument
    tab=$($automac safari open-tab "https://example.com/")
    assertEquals "https://example.com/" "$(echo $tab | jq -r .url)"
    $automac safari close-tab "$(echo $tab | jq -r .windowId)" "$(echo $tab | jq -r .index)"

    # Should not support passing two or more arguments
    $automac safari open-tab "https://example.com/" foo
    assertEquals 1 $?
}
function testCloseWindowArguments {
    # Error code 1
    # Should not support passing no-arguments
    $automac safari close-window
    assertEquals 1 $?

    # Should not support passing two or more arguments
    $automac safari close-window foo bar baz
    assertEquals 1 $?

    # Error code 2
    # Should fail with error code 2 if the window/tab combination doesn't
    # exist
    $automac safari close-tab foo bar
    assertEquals 2 $?
}
function testNewWindowArguments {
    # Should support passing an url as first argument
    windowId=$($automac safari open-window "about:blank"|jq -r .id)
    tabs=$($automac safari list-tabs-by-window-id $windowId)
    numberOfTabs=$(echo $tabs | jq --slurp length)
    assertEquals 1 $numberOfTabs
    assertEquals "about:blank" "$(echo $tabs | jq -r '.url')"
    $automac safari close-window $windowId

    # Should support not passing a first argument
    windowId=$($automac safari open-window |jq -r .id)
    tabs=$($automac safari list-tabs-by-window-id $windowId)
    numberOfTabs=$(echo $tabs | jq --slurp length)
    assertEquals 1 $numberOfTabs
    $automac safari close-window $windowId

    # Should fail otherwise
    $automac safari open-window foo bar
    assertEquals 1 $?
    $automac safari open-window foo bar baz
    assertEquals 1 $?
}


function testTabs {
    newTabId=$($automac safari open-tab | extractWindowAndIndex)
    listedTabIds=$($automac safari list-tabs | extractWindowAndIndex)
    assertContains "New tab should be among listed tabs"\
         "$listedTabIds"\
        "$newTabId"

    $automac safari close-tab $newTabId
    listedTabIds=$($automac safari list-tabs | extractWindowAndIndex)
    assertNotContains "New tab should not be among listed tabs after closing"\
        "$listedTabIds"\
        "$newTabId"
}

function testWindows {
    newWindowId=$($automac safari open-window | jq -r .id)
    listedWindowIds=$($automac safari list-windows | jq -r .id)
    assertContains "New window should be among listed windows"\
        "$listedWindowIds"\
        "$newWindowId"

    $automac safari close-window $newWindowId
    listedWindowIds=$($automac safari list-windows | jq -r .id)
    assertNotContains "New window should not be among listed windows after closing"\
        "$listedWindowIds"\
        "$newWindowId"
}

. $(which shunit2)

