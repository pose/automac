exports.usage = () => {
  console.error("Usage: automac notes get-by-id <note-id>");
};

exports.main = (argv) => {
  const notes = Application("Notes");
  notes.includeStandardAdditions = true;
  notes.strictPropertyScope = true;
  // TODO This breaks exists
  // notes.strictCommandScope = true
  notes.strictParameterType = true;

  if (argv.length !== 1) {
    throw new InvalidArguments();
  }

  // TODO validate
  const [noteId] = argv;

  // XXX For some reason, when permissions are not granted and the note is not
  // found this line doesn't throw a permissions error. This needs more investigation.
  const foundNote = notes.notes.byId(noteId);

  if (foundNote.exists() === false) {
    throw new NotFound("Note not found");
  }

  // TODO Getting the container data seems impossible
  console.log(JSON.stringify(foundNote.properties()));
};
