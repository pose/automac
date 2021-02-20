
exports.usage = () => {
  console.error("Usage: automac debug echo");
};

exports.main = (argv) => {
  console.log(JSON.stringify({ stdin: readFromStdin(), argv }));
}
