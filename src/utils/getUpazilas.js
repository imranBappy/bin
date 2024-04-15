const { bangladeshUpazilas } = require("@/data/location");

function getUpazilas(district) {
  const key = district?.toLowerCase().replace(/ /g, "_");
  if (bangladeshUpazilas[key]) {
    return bangladeshUpazilas[key];
  }
  return [];
}

export default getUpazilas;
