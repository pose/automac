
ObjC.import('Foundation');

console.log = function() {
    for (argument of arguments) {
        $.NSFileHandle.fileHandleWithStandardOutput.writeData($.NSString.alloc.initWithString(String(argument) + "\n").dataUsingEncoding($.NSUTF8StringEncoding));
    }
}

console.error = function () {
    for (argument of arguments) {
        $.NSFileHandle.fileHandleWithStandardError.writeData($.NSString.alloc.initWithString(String(argument) + "\n").dataUsingEncoding($.NSUTF8StringEncoding));
    }

}

function run(argv) {

  const notes = Application('Notes');
  notes.includeStandardAdditions = true;
  notes.strictPropertyScope = true
  // TODO This breaks exists
  // notes.strictCommandScope = true
  notes.strictParameterType = true


  // TODO validate
  const noteId = argv[0];

  const foundNote = notes.notes.byId(noteId);

  if (foundNote.exists() === false) {
    // TODO stderr
    console.error('Note not found.');
    return;
  }


  // TODO Getting the container data seems impossible
  console.log(JSON.stringify(foundNote.properties()));

  // Life saver!
  // console.log(JSON.stringify(foundNotes[0].properties()));
}
