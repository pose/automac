exports.usage = () => "[param1] [param2] [...]";

exports.main = (argv) => {
  console.log(JSON.stringify({ stdin: readFromStdin(), argv }));
};
