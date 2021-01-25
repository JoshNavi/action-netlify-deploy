exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  console.log(body);
};
