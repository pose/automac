exports.usage = () => "<name>";

exports.main = (argv) => {
  const notes = Application("Notes");
  // TODO Why?
  notes.includeStandardAdditions = true;

  if (argv.length !== 1) {
    throw new InvalidArguments();
  }

  const note = notes.Note({ name: argv[0], body: readFromStdin() }).make();
  console.log(JSON.stringify(note.properties()));
};
