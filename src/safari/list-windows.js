exports.usage = () => "";

exports.main = (argv) => {
  const safari = Application("Safari");

  if (argv.length !== 0) {
    throw new InvalidArgument();
  }

  safari.windows().forEach((w) => {
    console.log(JSON.stringify(w.properties()));
  });
};
