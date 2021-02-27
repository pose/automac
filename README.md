# `automac` - Shell Automation for macOS

Create shell scripts to automate macOS tasks.

## Usage

```sh
automac <module> <command>
```

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

Some other examples:

```sh
# List all Safari tabs
automac safari list-tabs

# List all Notes
automac notes list

# Retrieve a note by id from the Notes app
automac notes get-by-id x-coredata://F123D456-1234-1234-1234-111111111111/ICNote/p1234
```

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

## Tenets

- Return new line-separated JSON whenever possible.
  - Commands should do one and only one thing.
- Commands are separated in modules: each one corresponding to an app.
- The scripts should be bundled into a single executable file. There shouldn't
  be multiple scripts installed.
- This project uses the git/aws cli convention of `<module> <command>`.
- Ideally, scripts should be self contained, dependencies are discouraged.

## Testing

The main difficulty while testing is the interactions with OS X APIs. Creating
a note or deleting a note are not side effect free and an end-to-end test would
require to make sure that the right permissions are set and that the
applications are left in a consistent state.

## FAQs

## What versions of macOS are supported?

Currently, the project has only been tested on Big Sur but there are no restrictions for previous macOS versions which support JXA.

## How does it work?

`automac` uses JXA macOS JavaScript automation framework.

## Does this project contain any dependencies?

No, the idea is that the generated executable is self-contained and assembled from JavaScript files.

## Does this module require any native component compilation?

No, everything is scripted and uses macOS `osascript` for executing commands.

## Why is the bundling done by concatenating JavaScript files instead of using a proper bundling solution such like Webpack?

This was done to keep the project simple and dependency free. Migrating to Webpack could be added later if required.

## Why not using regular `Library` import when running tests instead of a custom require?

In theory, scripts could be imported using the `Library` function as described
[here](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/conceptual/ASLR_script_objects.html). However, it doesn't work out of the box due to [OSA_LIBRARY_PATH environment variable is ignored by restricted executables when running with System Integrity Protection enabled](https://stackoverflow.com/questions/35389058/why-wont-osa-library-path-not-work-as-documented-for-jxa).

### TODO

- [ ] Support for other browsers (not only Safari) to get the list of tabs.
  - [ ] Firefox
  - [ ] Google Chrome
- [ ] Add sample using `tesseract` to convert from notes with images to text!
- [ ] Add sample project about having a document with links and converting them
      to websites and adding them to new notes to be read later. So a reading list
      can be converted to different notes containing the actual articles!
- [ ] Sample about querying reports of screen time.
- [ ] Sample about getting email from mutt and adding it to notes.
- [ ] Idea for sample: Make notes a FUSE volume.
- [ ] Idea for sample: Achieve tiling of windows using the scripts.
- [ ] When installing, make sure to make the test targets optional if `jq` and
      `shunit2` are not present.
- [ ] Research how to install/add to brew/brew cask.
- [ ] Support different output formats like `aws cli`.
- [ ] Record gif video for the README.md
- [ ] Refactor so that command not found doesn't match the exit code of invalid
      arguments.
- [ ] Notes to RSS.
- [ ] Safari tabs to RSS.
- [ ] Backup notes to s3
- [ ] Backup and version notes in git.
