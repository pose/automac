# jxa

JavaScript for Automation provides the ability to use JavaScript for
interapplication communication between apps in OS X. These repo contains a
collection of some JXA (JavaScript for Automation) scripts.

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
mkdir build
cd build
../configure
make && make install
```

To uninstall:

```sh
make uninstall
```


### TODO

* [ ] Support for other browsers (not only Safari) to get the list of tabs.
  * [ ] Firefox
  * [ ] Google Chrome
* [ ] Add sample using `tesseract` to convert from notes with images to text!
