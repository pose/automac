ObjC.import("Foundation");

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

  const windows = asArray(safari.windows, (w) => ({
    ...w,
    id: w.id(),
    tabs: asArray(w.tabs, keyMapper(["name", "url"])),
  }));

  windows.forEach((w, index) => {
    w.tabs.forEach((t) => {
      console.log(JSON.stringify({ ...t, windowId: w.id }));
    });
  });
}
