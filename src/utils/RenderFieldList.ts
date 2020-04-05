const RenderFieldList = (list: (number|string)[]): string =>
  `[${list.map(v => typeof v == "number" ? v : `"${v}"`).join(',')}]`;

export default RenderFieldList;