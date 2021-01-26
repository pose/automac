ObjC.import("Foundation");
ObjC.import("stdlib");

console.log = function () {
  for (argument of arguments) {
    $.NSFileHandle.fileHandleWithStandardOutput.writeData(
      $.NSString.alloc
        .initWithString(String(argument) + " ")
        .dataUsingEncoding($.NSUTF8StringEncoding)
    );
  }
    $.NSFileHandle.fileHandleWithStandardOutput.writeData(
      $.NSString.alloc
        .initWithString("\n")
        .dataUsingEncoding($.NSUTF8StringEncoding)
    );
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

  if (argv.length !== 0) {
    $.exit(1);
    return;
  }

  let folders;
  try {
    folders = notes.folders();
  } catch (err) {
    // Permissions issue
    if (err.errorNumber === -1743) {
      $.exit(3);
    } else {
      console.error(`Unknown error: ${err} [${err.errorNumber}]`);
      $.exit(50);
    }
    return;
  }

  // Since this operation takes a long time with notes containing multiple
  // pictures, print the data as soon as it is available.
  for (let i = 0; i < folders.length; i++) {
    const notesById = notes.folders[i].notes.id();
    const notesByName = notes.folders[i].notes.name();
    for (let j = 0; j < notesById.length; j++) {
      const start = Date.now();
      // TODO This brings the whole note including the attachments (which takes a long time)
      const {passwordProtected, modificationDate, creationDate, shared, id,
        name} = notes.notes.byId(notesById[j]).properties();

      const note = {
        id,
        name,
        passwordProtected,
        modificationDate,
        creationDate,
        shared,
        "container.id": folders[i].id(),
        "container.name": folders[i].name()
      };

      console.log(JSON.stringify(note));
      // Useful for debugging which notes take a long time to process
      // console.log(Date.now() - start, notesById[j], notesByName[j]);
    }

  }

  $.exit(0);
}
