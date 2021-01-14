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

  const options = {};

  if (argv.length !== 0 && argv.length !== 1) {
    $.exit(1);
    return;
  }

  if (argv[0]) {
    options.url = argv[0];
  }

  safari.Document(options).make();

  // TODO Validate the assumption that the first window will always be the
  // newly created.
  console.log(JSON.stringify({id: safari.windows[0].id()}));
  $.exit(0);
}
