// TODO Add end-to-end tests
exports.usage = () => "<window-id>";

exports.main = (argv) => {
  const safari = Application("Safari");
  // TODO Argv validation

  safari.windows().filter((w) => {
    if (String(w.id()) === argv[0]) {
      // TODO Investigate why w.tabs().forEach(t => console.log(JSON.stringify(t.properties())))
      // cannot be used directly and the keyMapper is required.
      asArray(w.tabs(), keyMapper(["name", "url"])).forEach((t) => {
        console.log(JSON.stringify(t));
      });
    }
  });
};
