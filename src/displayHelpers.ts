const cropText = (str : String, end='...', ml = 100) => {
  if (str && typeof str == "string") {
    if (str.length > ml) {
      return `${str.slice(0, ml)}${end}`;
    }
  }
  return str;
};

const formatBytes = (bytes : number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export {
  cropText,
  formatBytes
}
