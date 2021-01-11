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

  if (argv.length !== 2) {
    // TODO Print usage
    console.error("Invalid number of arguments");
    $.exit(1);
  }

  const windowId = argv[0];
  const tabIndex = argv[1];

  safari.windows().filter((w) => {
    if (String(w.id()) === windowId) {
      console.log(JSON.stringify(w.tabs.whose({ index: tabIndex })[0].close()));
      $.exit(0);
    }
  });
  console.error("Window and tab not found");
  $.exit(2);
}
