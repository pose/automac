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

  // TODO Refactor this into a different function so the try/catch is
  // cleaner
  try {
    const windows = asArray(safari.windows, (w) => ({
      ...w,
      id: w.id(),
      tabs: asArray(w.tabs, keyMapper(["name", "url", "index"])),
    }));

    windows.forEach((w, index) => {
      w.tabs.forEach((t) => {
        console.log(JSON.stringify({ ...t, windowId: w.id }));
      });
    });
    $.exit(0);
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
}
