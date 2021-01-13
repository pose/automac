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
  const safari = Application("Safari");

  if (argv.length !== 1) {
    // TODO Print usage
    console.error("Invalid number of arguments");
    $.exit(1);
  }

  const windowId = argv[0];

  safari.windows().filter((w) => {
    if (String(w.id()) === windowId) {
      w.close({saving: "no"});
      // XXX This is required since it won't reflect the close tab change
      // otherwise.
      safari.activate();
      $.exit(0);
    }
  });
  console.error("Window not found");
  $.exit(2);
}
