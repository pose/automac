exports.usage = () => {
  console.error("Usage: automac safari close-window <window-id>");
};

exports.main = (argv) => {
  const safari = Application("Safari");

  if (argv.length !== 1) {
    throw new InvalidArguments();
  }

  const [windowId] = argv;

  safari.windows().filter((w) => {
    if (String(w.id()) === windowId) {
      // TODO Make this an argument
      w.close({saving: "no"});
      // XXX This is required since it won't reflect the close tab change
      // otherwise.
      safari.activate();
    }
  });
  throw new NotFound("Window not found");
};
