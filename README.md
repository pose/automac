# `automac` - Shell scripting for macOS applications

## Usage

```sh
automac <module> <command>
```

## Background

macOS offers many interactive applications such as the Notes and Safari apps.
Unfortunately, the way to interact with those apps programmatically is rather
limited and developers are forced to use [Applescript][applescript] or
[JXA][jxa]. Those automation tools are hard to debug, develop, and test: There
are multiple Stack Overflow posts pointing at JXA being fundamentally
[broken][jxa-broken], [undocumented][jxa-undocumented],
[unsupported][jxa-unsupported] and [cumbersome][jxa-cumbersome].

[applescript]: https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html#//apple_ref/doc/uid/TP40000983
[jxa]: https://developer.apple.com/library/archive/releasenotes/InterapplicationCommunication/RN-JavaScriptForAutomation/Articles/Introduction.html#//apple_ref/doc/uid/TP40014508
[jxa-broken]: https://stackoverflow.com/a/48271686
[jxa-cumbersome]: https://stackoverflow.com/questions/57217151/how-to-get-multiple-properties-from-objects-in-jxa
[jxa-unsupported]: https://stackoverflow.com/questions/47940322/cant-find-jxa-documentation?rq=1#comment101622733_47940322
[jxa-undocumented]: https://stackoverflow.com/questions/62834881/overcome-the-lack-of-jxa-documentation-by-being-able-to-explore-the-variables-in

`automac` enables shell scripting for macOS applications by doing the JXA
heavy lifting and providing a simplified command line interface. This tool
provides composable standard input and output, an extendable modular system
with commands that do one (and only one) thing, and JSON output by default. In
addition to that, `automac` executable is self-contained and doesn't require
any dependencies given that it only requires JXA that is already provided as
part of every macOS installation.

Some examples of integration with other tools command line tools such as `jq`,
`pandoc`, `aws`, and `sqlite3` can be found on the [`samples`](./samples) folder.

## Examples

For instance, create a new note on the macOS Notes app:

```sh
$ echo "Hello world" | automac notes create "New Note"
{
  "pcls":"note",
  "body":"...",
  "id":"x-coredata://F123D456-1234-1234-1234-111111111111/ICNote/p1234",
  "name":"New Note",
  "plaintext":"New Note\nHello World "
  ...
}
```

Which will show:

![](./docs/new-note-64.png)

Open a new Safari tab:

```sh
# Open new Safari tab pointing to example.com
$ automac safari open-tab https://example.com
{
  "url":"https://example.com/",
  "name":"Untitled",
  "index":13,
  "windowId":26971
}
```

Which will result in:

![](./docs/safari-tab-64.png)

Some other supported commands:

```sh
# List all Safari tabs
automac safari list-tabs

# List all Notes
automac notes list

# Retrieve a note by id from the Notes app
automac notes get-by-id x-coredata://F123D456-1234-1234-1234-111111111111/ICNote/p1234
```

For additional examples see the [samples](./samples) folder.

## Installation

```sh
autoreconf -fi
./configure
make && make check && make install
```

To uninstall:

```sh
make uninstall
```

## Testing

```sh
make check
```

Note: Testing triggers stateful interactions with macOS Applications. For
instance, Creating a note or deleting a note are not side effect free and an
end-to-end test require right permissions to be set.

## FAQs

## What versions of macOS are supported?

Currently, the project has only been tested on Big Sur but there are no
restrictions for previous macOS versions that support JXA.

## How does it work?

`automac` uses JXA macOS JavaScript automation framework.

## Does this project contain any dependencies?

No, the idea is that the generated executable is self-contained and assembled
from JavaScript files.

## Does this module require any native component compilation?

No, everything is scripted and uses macOS `osascript` for executing commands.

## Why is the bundling done by concatenating JavaScript files instead of using

## a proper bundling solution such like Webpack?

This was done to keep the project simple and dependency free. Migrating to
Webpack could be added later if required.

## Why not using regular `Library` import when running tests instead of a custom require?

In theory, scripts could be imported using the `Library` function as described
[here](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/conceptual/ASLR_script_objects.html). However, it doesn't work out of the box due to [OSA_LIBRARY_PATH environment variable is ignored by restricted executables when running with System Integrity Protection enabled](https://stackoverflow.com/questions/35389058/why-wont-osa-library-path-not-work-as-documented-for-jxa).

## Are there any other similar tools available?

[Hammerspoon](https://github.com/Hammerspoon/hammerspoon) provides a similar
bridge between macOS but using Lua instead to script automation.

## TODO

### For launch

- [ ] Complete the help command:
  - [ ]Documentation for each command
  - [ ] Complete man pages
  - [ ]Combine man pages with help options
- [ ] When installing, make sure to make the test targets optional if `jq` and
      `shunit2` are not present.
- [ ] Research how to install/add to brew/brew cask.

### Features

- [ ] Support for other browsers (not only Safari) to get the list of tabs.
  - [ ] Firefox
  - [ ] Google Chrome
- [ ] Customizable output format
- [ ] Achieve tiling of windows.
- [ ] Support different output formats like `aws cli`.

### Samples

- [ ] Using `tesseract` to convert from notes with images to text!
- [ ] Take a document with links and converting them to websites and adding
      them to new notes to be read later. So a reading list can be converted to
      different notes containing the actual articles!
- [ ] Make notes a FUSE volume.
- [ ] Notes to RSS.
- [ ] Safari tabs to RSS.
- [ ] Backup notes to s3
- [ ] Backup and version notes in git.
