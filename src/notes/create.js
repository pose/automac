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

function readFromStdin() {
  // Since osascript closes stdin we are forced to use /dev/fd/3 (a 3rd file descriptor) as a workaround
  // to receive data from stdin.
  var task = $.NSTask.alloc.init;
  var fd3 = $.NSFileHandle.fileHandleForReadingAtPath("/dev/fd/3");
  var data = fd3.readDataToEndOfFile;
  fd3.closeFile;
  data = $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding);
  return ObjC.unwrap(data);
}

function run(argv) {
  const notes = Application("Notes");
  notes.includeStandardAdditions = true;

  if (argv.length !== 1) {
    console.error("Invalid number of arguments.");
    $.exit(1);
    return;
  }

  const note = notes.Note({ name: argv[0], body: readFromStdin() }).make();
  console.log(JSON.stringify(note.properties()));
  $.exit(0);
}
