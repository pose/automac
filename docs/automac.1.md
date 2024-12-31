% automac(1) Version 0.1 | automac Documentation

# NAME

**automac** - Shell Automation for macOS.

# SYNOPSIS

| **automac** \<**module**\> \<**command**\>

# DESCRIPTION

**automac** allows shell scripting with macOS applications. For instance, it
allows accessing Safari tabs, obtaining entries from the Notes app, etc.

For detailed help on any particular module, execute `automac help <module>`.

# OPTIONS

-h, --help

: Prints brief usage information.

# EXAMPLES

List all notes in the macOS Notes app:

```
automac notes list
```

List all tabs in the macOS Safari browser:

```
automac safari tabs
```

Open a tab in the macOS Safari browser:

```
automac safari open-window https://www.google.com
```

Create a new note in the macOS Notes app:

```
# Reads from stdin
automac notes create "My new note" <<< "Content of the note"
```

# BUGS

See GitHub Issues: <https://github.com/pose/automac/issues>
