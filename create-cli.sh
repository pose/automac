#!/bin/bash

set -e

echo '#!/bin/bash';

# Obtain path where ./create-cli.sh is located.
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SRC_FOLDERS=$(find "$DIR/src" -type d -d 1)

for FOLDER_PATH in $SRC_FOLDERS; do
    cd "$FOLDER_PATH";
    CMD=$(basename -- "$(pwd)");
    JS_FILES=$(find . -type f -name "*.js")

    for i in $JS_FILES; do
        filename="$(basename -- "$i")"
        filenameWithoutExtension="${filename%.*}"
        cmdAndSubCmd="$CMD""_""$filenameWithoutExtension"
        echo "# $cmdAndSubCmd"
        echo "function $cmdAndSubCmd {"
        echo "exec osascript -l JavaScript - \"\$@\" 3<&0 <<'EOF$cmdAndSubCmd'"
        # Append src/init.js to the beginning of the file
        cat "$DIR/src/init.js"
        cat "$i"
        echo "EOF$cmdAndSubCmd"
        echo '}'
        echo "if [[ \"\$1\" == \"$CMD\" && \"\$2\" == \"$filenameWithoutExtension\" ]]; then"
        echo "  $CMD""_""$filenameWithoutExtension \"\${@:3}\""
        echo "  exit \$?";
        echo 'fi'
    done
    cd ../..

done

echo "echo 'OSA script automation. Usage:'"
echo "echo"
echo 'echo "    '\$'0 <command> <subcommand>"'
echo 'exit 1'
