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
        .initWithString(String(argument) + " ")
        .dataUsingEncoding($.NSUTF8StringEncoding)
    );
  }
  $.NSFileHandle.fileHandleWithStandardError.writeData(
    $.NSString.alloc
      .initWithString("\n")
      .dataUsingEncoding($.NSUTF8StringEncoding)
  );
};

function readFromStdin() {
  // Since osascript closes stdin we are forced to use /dev/fd/3 (a 3rd file
  // descriptor) as a workaround to receive data from stdin.
  var task = $.NSTask.alloc.init;
  var fd3 = $.NSFileHandle.fileHandleForReadingAtPath("/dev/fd/3");
  var data = fd3.readDataToEndOfFile;
  fd3.closeFile;
  data = $.NSString.alloc.initWithDataEncoding(data, $.NSUTF8StringEncoding);
  return ObjC.unwrap(data);
}

const asArray = (pseudoArray, mappingFunction) => {
  const result = [];

  for (let i = 0; i < pseudoArray.length; i++) {
    let element = pseudoArray[i];

    if (mappingFunction) {
      element = mappingFunction(element);
    }
    result.push(element);
  }

  return result;
};

const keyMapper = (allowlist) => (el) => {
  return allowlist.reduce((acc, allowlistedItem) => {
    acc[allowlistedItem] = el[allowlistedItem]();
    return acc;
  }, {});
};

class InvalidArguments extends Error {}
class NotFound extends Error {}

const modules = {};

const help = (module, command) => {
  let result = `usage: automac ${module} <command> <args>\n\n`;
  Object.entries(modules[module]).forEach(([key, value]) => {
    if (value.usage) {
      result += `    ${key} ${value.usage()}\n`;
    }
  });
  console.error(result);
};

const printUsage = () => {
  console.error("usage: automac <module> <command>");
  console.error("");
  console.error("These are the currently supported modules:");
  console.error("");
  Object.entries(modules).forEach(
    ([
      module,
      {
        index: { description },
      },
    ]) => {
      console.error(`    ${module} - ${description()}`);
    }
  );
};

function run(argv) {
  // called without arguments
  if (argv.length === 0) {
    printUsage();
    $.exit(1);
    return;
  }

  // Invalid command
  if (!modules[argv[0]]) {
    printUsage();
    $.exit(1);
    return;
  }

  // called with one argument, should call help on that
  // argument.
  if (argv.length === 1) {
    help(argv[0]);
    $.exit(1);
    return;
  }

  // Invalid subcommand
  if (!modules[argv[0]][argv[1]]) {
    help(argv[0]);
    $.exit(1);
    return;
  }

  const { main, usage } = modules[argv[0]][argv[1]];

  if (!main) {
    printUsage();
    $.exit(1);
    return;
  }

  try {
    main(argv.slice(2));
    $.exit(0);
  } catch (err) {
    if (err instanceof InvalidArguments) {
      console.error("Invalid arguments.");
      help(argv[0]);
      usage();
      $.exit(1);
    } else if (err instanceof NotFound) {
      console.error(err);
      usage();
      $.exit(2);

      // Permissions issue
    } else if (err.errorNumber === -1743) {
      $.exit(3);
    } else {
      console.error(`Unknown error: ${err} [${err.errorNumber}]`);
      $.exit(50);
    }
    return;
  }
}
