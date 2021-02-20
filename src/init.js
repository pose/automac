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
    .initWithString(String(argument) + "\n")
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

class InvalidArguments extends Error { }
class NotFound extends Error { }

function run(argv) {
  const {main, usage} = module.exports;
  try {
    main(argv);
    $.exit(0);
  } catch (err) {
    if (err instanceof InvalidArguments) {
      console.error("Invalid arguments.");
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

if (typeof module === 'undefined') {
  module = {};
  exports = {};
  module.exports = exports;
}
