const bangladesh_division_and_district = require("../data/bangladesh_division_and_district.json");

function getDivision() {
  return JSON.parse(
    JSON.stringify(bangladesh_division_and_district.allDivisions)
  );
}
function getDistrict(divisionId) {
  if (!divisionId) return [];
  if (!bangladesh_division_and_district[divisionId]) return [];
  return JSON.parse(
    JSON.stringify(bangladesh_division_and_district[divisionId].allDistricts)
  );
}
function getSubDistrict(divisionId, districtId) {
  if (!divisionId || !districtId) return [];
  if (
    !bangladesh_division_and_district[divisionId]?.districts[districtId]
      ?.allSubDistricts
  )
    return [];
  return JSON.parse(
    JSON.stringify(
      bangladesh_division_and_district[divisionId]?.districts[districtId]
        ?.allSubDistricts
    )
  );
}

export { getDivision, getDistrict, getSubDistrict };
