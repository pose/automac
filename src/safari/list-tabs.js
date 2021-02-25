exports.usage = () => "";

exports.main = (argv) => {
  const safari = Application("Safari");

  if (argv.length !== 0) {
    throw new InvalidArguments();
  }

  const windows = asArray(safari.windows, (w) => ({
    ...w,
    id: w.id(),
    tabs: asArray(w.tabs, keyMapper(["name", "url", "index"])),
  }));

  windows.forEach((w, index) => {
    w.tabs.forEach((t) => {
      console.log(JSON.stringify({ ...t, windowId: w.id }));
    });
  });
};
