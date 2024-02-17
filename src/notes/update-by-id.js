exports.usage = () => "<note-id> <name>";

exports.main = (argv) => {
  const notes = Application("Notes");
  notes.includeStandardAdditions = true;
  notes.strictPropertyScope = true;
  // TODO This breaks exists
  // notes.strictCommandScope = true
  notes.strictParameterType = true;

  if (argv.length !== 2) {
    throw new InvalidArguments();
  }

  // TODO validate
  const noteId = argv[0];
  const name = argv[1];

  // XXX For some reason, when permissions are not granted and the note is not
  // found this line doesn't throw a permissions error. This needs more investigation.
  const foundNote = notes.notes.byId(noteId);

  if (foundNote.exists() === false) {
    throw new NotFound("Note not found");
  }

  foundNote.body = readFromStdin();
  foundNote.name = name;
};
