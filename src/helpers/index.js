export const handleConvertDatetime = (datetime) => {
  const date = new Date(datetime);
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    formattedDate: `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`,
  };
};
export const checkMaxSizeFile = (file) => {
  const maxSize = 1 * 1024 * 1024; // size = 1MB;
  if (file) {
    const size = file.size;
    if (size > maxSize) return false;
    return true;
  }
};
