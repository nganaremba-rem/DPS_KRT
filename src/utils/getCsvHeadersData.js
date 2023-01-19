export const getCsvHeadersData = (data) => {
  const result = [];
  Object.keys(data?.[0]).map((key) => {
    if (typeof data?.[0][key] === "object" && data?.[0][key] !== null) {
      Object.keys(data[0][key]).forEach((innerKey) => {
        result.push({
          label: innerKey,
          key: innerKey,
        });
      });
    } else {
      result.push({
        label: key,
        key,
      });
    }
  });

  const myData = [];
  data.forEach((item, idx) => {
    let obj = {};
    Object.keys(item).forEach((key) => {
      if (typeof data[idx][key] === "object" && data[idx][key] !== null) {
        Object.keys(data[idx][key]).forEach((innerKey) => {
          obj[innerKey] = data[idx][key][innerKey];
        });
      } else {
        obj[key] = data[idx][key];
      }
    });
    myData.push(obj);
  });

  return {
    headers: result,
    data: myData,
  };
};
