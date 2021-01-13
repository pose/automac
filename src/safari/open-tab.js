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

  const serialize = (t) => {
    return {url: t.url(), name: t.name(), index: t.index()};
  };

  const options = {};

  if (argv[0]) {
    options.url = argv[0];
  }

  const res = safari.windows[0].tabs.push(new safari.Tab(options));
  console.log(JSON.stringify({
    ...serialize(safari.windows[0].tabs[res - 1]),
    windowId: safari.windows[0].id()
  }));
}
