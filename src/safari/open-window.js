exports.usage = () => "[url]";

exports.main = (argv) => {
  const safari = Application("Safari");

  const options = {};

  if (argv.length !== 0 && argv.length !== 1) {
    throw new InvalidArguments();
  }

  if (argv[0]) {
    options.url = argv[0];
  }

  safari.Document(options).make();

  // TODO Validate the assumption that the first window will always be the
  // newly created.
  console.log(JSON.stringify({ id: safari.windows[0].id() }));
};
