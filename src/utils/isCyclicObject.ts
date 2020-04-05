const isCyclicObject = (obj: object, stack: object[] = []): boolean => {
  if (!obj || typeof obj !== 'object')
    return false;
  
  if (stack.includes(obj))
    return true;

  let s = stack.concat([obj]);

  for (let x of Array.isArray(obj) ? obj : Object.values(obj))
    if (isCyclicObject(x, s))
      return true;

  return false;
};

export default isCyclicObject;