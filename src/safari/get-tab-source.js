exports.usage = () => "<windowId> <tabIndex>";

exports.main = (argv) => {
  const safari = Application("Safari");

  if (argv.length !== 2) {
    // InvalidArguments
    throw new InvalidArguments("Invalid number of arguments");
  }

  const [windowId, tabIndex] = argv;

  safari.windows().filter((w) => {
    if (String(w.id()) === windowId) {
      const source = w.tabs.whose({ index: tabIndex })[0].source();
      console.log(source);
      $.exit(0);
    }
  });

  throw new NotFound("Window or tab not found");
};
