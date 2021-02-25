exports.usage = () => "<note-id>";

exports.main = (argv) => {
  const notes = Application("Notes");
  // TODO Why is this required?
  notes.includeStandardAdditions = true;
  notes.strictPropertyScope = true;
  // TODO This breaks exists
  // notes.strictCommandScope = true
  notes.strictParameterType = true;

  if (argv.length !== 1) {
    throw new InvalidArguments();
  }

  const [noteId] = argv;
  const foundNote = notes.notes.byId(noteId);

  if (foundNote.exists() === false) {
    throw new NotFound("Note not found.");
  }

  foundNote.delete();
};
