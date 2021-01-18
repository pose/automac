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

  // TODO validate
  const noteId = argv[0];

  if (argv.length !== 1) {
    $.exit(1);
    return;
  }

  const foundNote = notes.notes.byId(noteId);

  if (foundNote.exists() === false) {
    // TODO stderr
    console.error("Note not found.");
    $.exit(2);
    return;
  }

  foundNote.delete();
  $.exit(0);
}
