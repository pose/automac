ObjC.import("Foundation");
ObjC.import("stdlib");

console.log = function () {
  for (argument of arguments) {
    $.NSFileHandle.fileHandleWithStandardOutput.writeData(
      $.NSString.alloc
        .initWithString(String(argument) + "\n")
        .dataUsingEncoding($.NSUTF8StringEncoding)
    );
  }
};

console.error = function () {
  for (argument of arguments) {
    $.NSFileHandle.fileHandleWithStandardError.writeData(
      $.NSString.alloc
        .initWithString(String(argument) + "\n")
        .dataUsingEncoding($.NSUTF8StringEncoding)
    );
  }
};

function run(argv) {
  const notes = Application("Notes");
  notes.includeStandardAdditions = true;
  notes.strictPropertyScope = true;
  // TODO This breaks exists
  // notes.strictCommandScope = true
  notes.strictParameterType = true;

  if (argv.length !== 1) {
    $.exit(1);
    return;
  }

  // TODO validate
  const noteId = argv[0];

  // XXX For some reason, when permissions are not granted and the note is not
  // found this line doesn't throw a permissions error. This needs more investigation.
  const foundNote = notes.notes.byId(noteId);

  if (foundNote.exists() === false) {
    console.error("Note not found.");
    $.exit(2);
    return;
  }

  // TODO Getting the container data seems impossible
  console.log(JSON.stringify(foundNote.properties()));
  $.exit(0);
}
