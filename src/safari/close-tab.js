exports.usage = () => {
  console.error("Usage: automac <windowId> <tabIndex>");
}

exports.main = (argv) => {
  const safari = Application("Safari");

  if (argv.length !== 2) {
    // InvalidArguments
    throw new InvalidArguments("Invalid number of arguments");
  }

  const [windowId, tabIndex] = argv;

  safari.windows().filter((w) => {
    if (String(w.id()) === windowId) {
      w.tabs.whose({ index: tabIndex })[0].close();
      $.exit(0);
    }
  });


  throw new NotFound("Window or tab not found");
}
