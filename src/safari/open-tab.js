const serialize = (t) => {
  return {url: t.url(), name: t.name(), index: t.index()};
};

exports.usage = () => {
  console.error("Usage: automac safari open-tab [<url>]");
};

exports.main = (argv) => {
  const safari = Application("Safari");

  if (argv.length !== 0 && argv.length !== 1) {
    throw new InvalidArguments();
  }

  const options = {};

  if (argv[0]) {
    options.url = argv[0];
  }

  res = safari.windows[0].tabs.push(new safari.Tab(options));
  console.log(JSON.stringify({
    ...serialize(safari.windows[0].tabs[res - 1]),
    windowId: safari.windows[0].id()
  }));
}
