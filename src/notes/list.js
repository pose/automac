exports.usage = () => "";

exports.main = (argv) => {
  const notes = Application("Notes");

  if (argv.length !== 0) {
    throw new InvalidArguments();
  }

  const folders = notes.folders();

  // Since this operation takes a long time with notes containing multiple
  // pictures, print the data as soon as it is available.
  for (let i = 0; i < folders.length; i++) {
    const notesById = notes.folders[i].notes.id();
    for (let j = 0; j < notesById.length; j++) {
      const start = Date.now();
      // TODO This brings the whole note including the attachments (which takes a long time)
      const rawNote = notes.notes.byId(notesById[j]);
      const {
        passwordProtected,
        modificationDate,
        creationDate,
        shared,
        id,
        name,
      } = rawNote.properties();

      const note = {
        id,
        name,
        passwordProtected,
        modificationDate,
        creationDate,
        shared,
        "container.id": folders[i].id(),
        "container.name": folders[i].name(),
        attachments: asArray(rawNote.attachments, keyMapper(["id"]))
      };

      // By default, ignore the "Recenty Deleted" folder.
      if (note["container.name"] !== 'Recently Deleted') {
        console.log(JSON.stringify(note));
      }
      // Useful to debug which notes take a long time to process
      // console.log(Date.now() - start, notesById[j], notesByName[j]);
    }
  }
};
