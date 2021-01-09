#!/bin/bash

function extractWindowAndIndex {
    jq -r '(.windowId|tostring) + "-" + (.index|tostring)'
}

function testTabs {
    newTabId=$($osacli safari open-tab | extractWindowAndIndex)
    listedTabIds=$($osacli safari list-tabs | extractWindowAndIndex)
    assertContains "New tab should be among listed tabs"\
        "$listedTabIds"\
        "$newTabId"
}

function testWindows {
    newWindowId=$($osacli safari open-window | jq -r .windowId)
    listedWindowIds=$($osacli safari list-windows | jq -r .windowId)
    assertContains "New window should be among listed windows"\
        "$listedWindowIds"\
        "$newWindowId"
}


. $(which shunit2)

