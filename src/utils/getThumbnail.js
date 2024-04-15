function getThumbnail(json) {
  if (!json) return "";
  const data = JSON.parse(json);
  return data?.images[0] || "";
}

export default getThumbnail;
