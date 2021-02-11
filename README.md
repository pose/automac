# `automac` - Shell Automation for macOS

Author bash scripts for automation for macOS apps.

Create shell scripts to automate macOS tasks. For instance, list tabs open on
Safari by doing:

## TODO Safari tab goes here

```sh
$ automac safari list-tabs
{"name":"Example Domain","url":"https://example.com/","index":1,"windowId":3570}
```

Or create a new note on the macOS Notes app:

```sh
echo "Hello world" | automac notes create "New Note"
{"pcls":"note","passwordProtected":false,"modificationDate":"2021-02-02T13:50:17.000Z","creationDate":"2021-02-02T13:50:17.000Z","shared":false,"body":"<div><font face=\"Helvetica\"><span style=\"font-size: 12px\">New Note</span></font></div>\n<div>Hello World </div>\n","id":"x-coredata://F123D456-1234-1234-1234-111111111111/ICNote/p1234","name":"New Note","plaintext":"New Note\nHello World "}
```

### TODO create new note goes here

## Usage

```sh
automac <app> <command>
```

Examples:

```sh
# List all Safari tabs
automac safari list-tabs

# Open new Safari tab pointing to example.com
automac safari open-tab https://example.com

# List all Notes
automac notes list

# Retrieve a note by id
automac notes get-by-id x-coredata://F123D456-1234-1234-1234-111111111111/ICNote/p1234
```


### Tenets

 * Return new line-separated JSON whenever possible.
 *  Sub-commands should do one and only one thing.
 * Commands are separated in categories: each one corresponding to an app.
 * The scripts should be bundled into a single executable file. There shouldn't
   be multiple scripts installed.
 * This project uses the git convention of `<command> <sub-command>`.
 * Passing a large amount of data in should be done through `stdin`.
 * Ideally, scripts should be self contained, dependencies are discouraged.

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

### Testing

The main difficulty while testing is the interactions with OS X APIs. Creating
a note or deleting a note are not side effect free and an end-to-end test would
require to make sure that the right permissions are set and that the
applications are left in a consistent state.

#### Integration Testing

One way to achieve integration testing (not end-to-end) would be mocking the
`Application` function. Signatures of each of the files on the `src/**/*.js`
can be modified so that `main` functions receive this new signature:

```
function main(argv, {Application} = {Application}) {
```

Note that `Application` is wrapped into an object so that argument can later be
extended if more objects require to be mocked.

### Why not using regular `Library` import when running tests instead of a custom require?

In theory, scripts could be imported using the `Library` function as described
[here](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/conceptual/ASLR_script_objects.html). However, it doesn't work out of the box due to [OSA_LIBRARY_PATH environment variable is ignored by restricted executables when running with System Integrity Protection enabled](https://stackoverflow.com/questions/35389058/why-wont-osa-library-path-not-work-as-documented-for-jxa).

### TODO

* [ ] Support for other browsers (not only Safari) to get the list of tabs.
  * [ ] Firefox
  * [ ] Google Chrome
* [ ] Add sample using `tesseract` to convert from notes with images to text!
* [ ] Add sample project about having a document with links and converting them
  to websites and adding them to new notes to be read later. So a reading list
  can be converted to different notes containing the actual articles!
* [ ] Sample about querying reports of screen time.
* [ ] Sample about getting email from mutt and adding it to notes.
* [ ] Idea for sample: Make notes a FUSE volume.
* [ ] Idea for sample: Achieve tiling of windows using the scripts.
* [ ] When installing, make sure to make the test targets optional if `jq` and
  `shunit2` are not present.
* [ ] Research how to install/add to brew/brew cask.
* [ ] Support different output formats like `aws cli`.
* [ ] Record gif video for the README.md
* [ ] Refactor so that command not found doesn't match the exit code of invalid
  arguments.
* [ ] Notes to RSS.
* [ ] Safari tabs to RSS.
