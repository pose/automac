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
    // TODO Add message
    $.exit(1);
    return;
  }
  const folderId = argv[0];

  const foundFolder = notes.folders.byId(folderId);

  if (foundFolder.exists() === false) {
    console.error("Folder not found.");
    $.exit(2);
    return;
  }

  // TODO Getting the container data seems impossible
  const notesById = foundFolder.notes.id();
  notesById.forEach((noteId) => console.log(JSON.stringify({ id: noteId })));
  $.exit(0);
}
