#!/bin/bash

automac=${automac:-./automac}

# TODO unicode and encoding tests
function testEcho {
    msg="Hello World!"
    echoResult=$(echo "$msg" | $automac debug echo 1 2 3)
    assertEquals "$msg" "$(echo "$echoResult" | jq -r .stdin)"
    assertEquals "123"  "$(echo "$echoResult" | jq -j '.argv[]')"
}

. $(which shunit2)

