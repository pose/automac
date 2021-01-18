#!/bin/bash

osacli=${osacli:-./osacli}

function extractWindowAndIndex {
    jq -r '(.windowId|tostring) + " " + (.index|tostring)'
}

function testSafariCloseTabArguments {
    # Error code 1
    # Should not support passing no-arguments
    $osacli safari close-tab
    assertEquals 1 $?

    # Should not support passing one argument
    $osacli safari close-tab foo
    assertEquals 1 $?

    # Should not support passing three arguments
    $osacli safari close-tab foo bar baz
    assertEquals 1 $?

    # Error code 2
    # Should fail if the window/tab combination doesn't exist
    $osacli safari close-tab foo bar
    assertEquals 2 $?
}
function testSafariNewTabArguments {
    # Should support passing an url as first argument
    tab=$($osacli safari open-tab "https://example.com/")
    assertEquals "https://example.com/" "$(echo $tab | jq -r .url)"
    $osacli safari close-tab "$(echo $tab | jq -r .windowId)" "$(echo $tab | jq -r .index)"

    # Should not support passing two or more arguments
    $osacli safari open-tab "https://example.com/" foo
    assertEquals 1 $?
}
function testSafariCloseWindowArguments {
    # Error code 1
    # Should not support passing no-arguments
    $osacli safari close-window
    assertEquals 1 $?

    # Should not support passing two or more arguments
    $osacli safari close-window foo bar baz
    assertEquals 1 $?

    # Error code 2
    # Should fail with error code 2 if the window/tab combination doesn't
    # exist
    $osacli safari close-tab foo bar
    assertEquals 2 $?
}
function testSafariNewWindowArguments {
    # Should support passing an url as first argument
    windowId=$($osacli safari open-window "about:blank"|jq -r .id)
    tabs=$($osacli safari list-tabs-by-window-id $windowId)
    numberOfTabs=$(echo $tabs | jq --slurp length)
    assertEquals 1 $numberOfTabs
    assertEquals "about:blank" "$(echo $tabs | jq -r '.url')"
    $osacli safari close-window $windowId

    # Should support not passing a first argument
    windowId=$($osacli safari open-window |jq -r .id)
    tabs=$($osacli safari list-tabs-by-window-id $windowId)
    numberOfTabs=$(echo $tabs | jq --slurp length)
    assertEquals 1 $numberOfTabs
    $osacli safari close-window $windowId

    # Should fail otherwise
    $osacli safari open-window foo bar
    assertEquals 1 $?
    $osacli safari open-window foo bar baz
    assertEquals 1 $?
}


function testTabs {
    newTabId=$($osacli safari open-tab | extractWindowAndIndex)
    listedTabIds=$($osacli safari list-tabs | extractWindowAndIndex)
    assertContains "New tab should be among listed tabs"\
         "$listedTabIds"\
        "$newTabId"

    $osacli safari close-tab $newTabId
    listedTabIds=$($osacli safari list-tabs | extractWindowAndIndex)
    assertNotContains "New tab should not be among listed tabs after closing"\
        "$listedTabIds"\
        "$newTabId"
}

function testWindows {
    newWindowId=$($osacli safari open-window | jq -r .id)
    listedWindowIds=$($osacli safari list-windows | jq -r .id)
    assertContains "New window should be among listed windows"\
        "$listedWindowIds"\
        "$newWindowId"

    $osacli safari close-window $newWindowId
    listedWindowIds=$($osacli safari list-windows | jq -r .id)
    assertNotContains "New window should not be among listed windows after closing"\
        "$listedWindowIds"\
        "$newWindowId"
}

. $(which shunit2)

