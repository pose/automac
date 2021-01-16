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


function run(argv) {
  const safari = Application("Safari");

  if (argv.length !== 0 && argv.length !== 1) {
    $.exit(1);
    return;
  }

  const options = {};

  if (argv[0]) {
    options.url = argv[0];
  }

  const res = safari.windows[0].tabs.push(new safari.Tab(options));
  console.log(JSON.stringify({
    ...serialize(safari.windows[0].tabs[res - 1]),
    windowId: safari.windows[0].id()
  }));
  $.exit(0);
}
