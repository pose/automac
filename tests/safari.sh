#!/bin/bash

osacli=${osacli:-./osacli}

# TODO Add argument validation tests

function extractWindowAndIndex {
    jq -r '(.windowId|tostring) + " " + (.index|tostring)'
}

# function testSafariCloseTabArguments {
#     fail
# }
# function testSafariNewTabArguments {
#     fail
# }
# function testSafariCloseWindowArguments {
#     fail
# }
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

