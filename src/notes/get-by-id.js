exports.usage = () => "<note-id>";

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

  let attachments = [];
  if (foundNote.attachments.length !== 0) {
    attachments = asArray(foundNote.attachments, (attachment) => ({
    ...attachment.properties(),
      contents: attachment.contents()?.toString() ?? null
    }));
  }

  // TODO Getting the container data seems impossible
  console.log(JSON.stringify({...foundNote.properties(), attachments}));
};
