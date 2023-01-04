export const getTableCols = (data, optional = []) => {
  // console.log(data);
  const nestedObj = [];
  const normalData = Object.keys(data[0]).filter((key) => {
    if (typeof data[0][key] === "object" && data[0][key] !== null) {
      const arr = Object.keys(data[0][key]).map((innerKey) => innerKey);
      nestedObj.push(...arr);
      return false;
    }
    return true;
  });
  const columnsData = [...new Set([...normalData, ...nestedObj])];

  const columnsWithCustomCell = [];
  const columnsWithoutCustomCell = columnsData.filter((col) => {
    for (let i of optional) {
      if (i.key === col) return false;
    }
    return true;
  });
  const colWithoutData = columnsWithoutCustomCell.map((key) => ({
    Header: key,
    accessor: key,
  }));

  optional.forEach((option) => {
    if (columnsData.includes(option.key)) {
      columnsWithCustomCell.push({
        Header: option.key,
        accessor: option.key,
        Cell: option.cell,
      });
    }
  });
  const finalCol = [...colWithoutData, ...columnsWithCustomCell];
  return finalCol;
};

export const getTableData = (data) => {
  const arr = [];
  // console.log(data);

  data.forEach((item, index) => {
    let obj = {};
    Object.keys(item).forEach((itemKey) => {
      if (
        typeof data[index][itemKey] === "object" &&
        data[index][itemKey] !== null
      ) {
        Object.keys(data[index][itemKey]).forEach((key) => {
          obj[key] = data[index][itemKey][key];
        });
      } else {
        obj[itemKey] = data[index][itemKey];
      }
    });
    arr.push(obj);
  });

  return arr;
};
