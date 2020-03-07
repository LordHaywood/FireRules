export default (path: string, params: string[], logs: string[] = []): string[] => {
  const pathSegments: string[] = path.split(/\//g);
  
  if (pathSegments.length < 0 || pathSegments.length % 2 != 0)
    logs.push(`Path is invalid ${path}`);

  pathSegments.forEach((v, i) => {
    if (i % 2 == 0) {
      if (!(/^[a-zA-Z0-9-_]+$/.test(v)))
        logs.push(`Invalid collectionId "${v}" in path ${path}. Must be [a-zA-Z0-9-_]+`);
    } else {
      if (v.charAt(-1) == "{" && v.charAt(-1) == "}") {
        const paramName: string = v.substring(1, v.length - 2);
        if (/^[a-zA-Z-_]+$/.test(paramName))
          logs.push(`Invalid document param Id "${paramName}" in path ${path}. Must be [a-zA-Z-_]+`);
        params.push()
      } else {
        if (!(/^[a-zA-Z0-9-_]+$/.test(v)))
          logs.push(`Invalid documentId "${v}" in path ${path}. Must be [a-zA-Z0-9-_]+`);
      }
    }
  });

  return params;
};