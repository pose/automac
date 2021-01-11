#!/bin/bash

function extractWindowAndIndex {
    jq -r '(.windowId|tostring) + " " + (.index|tostring)'
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
    newWindowId=$($osacli safari open-window | jq -r .windowId)
    listedWindowIds=$($osacli safari list-windows | jq -r .windowId)
    assertContains "New window should be among listed windows"\
        "$listedWindowIds"\
        "$newWindowId"

    // TODO
    startSkipping

    $osacli safari close-window $newWindowId
    listedWindowIds=$($osacli safari list-windows | jq -r .windowId)
    assertNotContains "New window should not be among listed windows after closing"\
        "$listedWindowIds"\
        "$newWindowId"

    endSkipping
}

. $(which shunit2)

