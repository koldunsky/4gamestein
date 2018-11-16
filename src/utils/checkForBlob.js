export default () => {
  let canBlob;
  try {
    !!new Blob();
    canBlob = true;
  } catch (e) {
    canBlob = false;
    return false;
  }
  return canBlob;
}