module.exports.toMySQLDate = (dateString) =>
  new Date(new Date(dateString).toISOString().slice(0, 19).replace("T", " "));
