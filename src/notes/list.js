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

const keyMapper = (allowlist) => (el) => {
  return allowlist.reduce((acc, allowlistedItem) => {
    acc[allowlistedItem] = el[allowlistedItem]();
    return acc;
  }, {});
};

function run(argv) {
  const notes = Application("Notes");

  if (argv.length !== 0) {
    $.exit(1);
    return;
  }

  const folders = asArray(notes.folders, (f) => ({
    ...f,
    id: f.id(),
    name: f.name(),
    notes: asArray(f.notes, keyMapper(["name", "id"])).map((n) => ({
      ...n,
      "container.id": f.id(),
      "container.name": f.name(),
    })),
  }));

  folders.forEach((f) => {
    if (f.name === "Recently Deleted") {
      return;
    }

    f.notes.forEach((n) => {
      console.log(JSON.stringify(n));
    });
  });
  $.exit(0);
}
