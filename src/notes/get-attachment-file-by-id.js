exports.usage = () => "<attachment-id>";

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
  const [attachmentId] = argv;

  // XXX For some reason, when permissions are not granted and the note is not
  // found this line doesn't throw a permissions error. This needs more investigation.
  const foundAttachment = notes.attachments.byId(attachmentId);

  if (foundAttachment.exists() === false) {
    throw new NotFound("Attachment not found");
  }

  // TODO Getting the container data seems impossible
  // console.log(foundAttachment.contents());
  console.log(JSON.stringify({id: foundAttachment.id(), filepath: foundAttachment.contents().toString()}));
};
