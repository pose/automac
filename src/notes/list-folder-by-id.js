exports.usage = () => "<folder-id>";

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

  const [folderId] = argv;
  const foundFolder = notes.folders.byId(folderId);

  if (foundFolder.exists() === false) {
    throw new NotFound("Note not found");
  }

  // TODO Getting the container data seems impossible
  const notesById = foundFolder.notes.id();
  notesById.forEach((noteId) => console.log(JSON.stringify({ id: noteId })));
};
