import { RenderInteralFieldPath, RenderFieldPath, RenderInteralUpdateFieldPath, RenderFieldList, RenderDocFieldPath, RenderField, RenderFields, RenderFieldGroup } from "./ConditionsProcessor";

describe("RenderInteralFieldPath", () => {
  test("without params", () => {
    expect(RenderInteralFieldPath(["field", ["users", "userABC"]])).toBe(`resource.data.users.userABC`);
  });

  test("with params", () => {
    expect(RenderInteralFieldPath(["field", ["users", ["param", "uid"]]])).toBe(`resource.data.users[uid]`);
  });
});

describe("RenderInteralUpdateFieldPath", () => {
  test("without params", () => {
    expect(RenderInteralUpdateFieldPath(["updateField", ["users", "userABC"]])).toBe(`request.resource.data.users.userABC`);
  });

  test("with params", () => {
    expect(RenderInteralUpdateFieldPath(["updateField", ["users", ["param", "uid"]]])).toBe(`request.resource.data.users[uid]`);
  });
});

describe("RenderFieldPath", () => {
  test("without params", () => {
    expect(RenderFieldPath(["users", "userABC"])).toBe(`.users.userABC`);
  });

  test("with params", () => {
    expect(RenderFieldPath(["users", ["param", "uid"]])).toBe(`.users[uid]`);
  });
});

describe("RenderFieldList", () => {
  test("no elements", () => {
    expect(RenderFieldList([])).toBe(`[]`);
  });

  test("only string elements", () => {
    expect(RenderFieldList(["elm1", "elm2"])).toBe(`["elm1","elm2"]`);
  });

  test("only number elements", () => {
    expect(RenderFieldList([0, 1, 2])).toBe(`[0,1,2]`);
  });

  test("mixed string and number elements", () => {
    expect(RenderFieldList([0, 1, 2, "abc", "efg"])).toBe(`[0,1,2,"abc","efg"]`);
  });
});

describe("RenderDocFieldPath", () => {
  test("without params", () => {
    expect(RenderDocFieldPath(["doc", ["users", "abc"], ["field", ["displayName"]]])).toBe(`get(/databases/$(database)/documents/users/abc).data.displayName`);
  });

  test("with params", () => {
    expect(RenderDocFieldPath(["doc", ["users", ["param", "uid"]], ["field", ["displayName"]]])).toBe(`get(/databases/$(database)/documents/users/$(uid)).data.displayName`);
  });
});

describe("RenderField", () => {
  describe("RenderDocFieldPath", () => {
    test("without params", () => {
      expect(RenderField(["doc", ["users", "abc"], ["field", ["displayName"]]])).toBe(`get(/databases/$(database)/documents/users/abc).data.displayName`);
    });
  
    test("with params", () => {
      expect(RenderField(["doc", ["users", ["param", "uid"]], ["field", ["displayName"]]])).toBe(`get(/databases/$(database)/documents/users/$(uid)).data.displayName`);
    });

  });
  
  describe("RenderInteralFieldPath", () => {
    test("without params", () => {
      expect(RenderField(["field", ["users", "userABC"]])).toBe(`resource.data.users.userABC`);
      expect(RenderField(["updateField", ["users", "userABC"]])).toBe(`request.resource.data.users.userABC`);
    });
  
    test("with params", () => {
      expect(RenderField(["field", ["users", ["param", "uid"]]])).toBe(`resource.data.users[uid]`);
      expect(RenderField(["updateField", ["users", ["param", "uid"]]])).toBe(`request.resource.data.users[uid]`);
    });
  });
});


describe("conditions.Boolean", () => {
  test("field", () => {
    expect(RenderFields(["field", ["map", "id"]])).toBe(`resource.data.map.id`);
    expect(RenderFields(["updateField", ["map", "id"]])).toBe(`request.resource.data.map.id`);
  });
  
  test("document", () => {
    expect(RenderFields(["doc", ["collectionName", "docId"], ["field", ["fieldId", "id"]]])).toBe(`get(/databases/$(database)/documents/collectionName/docId).data.fieldId.id`);
  });
  
  test("document with params", () => {
    expect(RenderFields(["doc", ["collectionName", ["param", "uid"]], ["field", ["fieldId", "id"]]])).toBe(`get(/databases/$(database)/documents/collectionName/$(uid)).data.fieldId.id`);
  });
});

describe("conditions.Timestamp", () => {
  describe("withinRequest", () => {
    test("seconds", () => {
      expect(RenderFields([["field", ["map", "id"]], "withinRequest", "seconds", 5])).toBe(`(request.time.toMillis() - resource.data.map.id.seconds() * 1000) < duration.value(5, "s")`);
      expect(RenderFields([["updateField", ["map", "id"]], "withinRequest", "seconds", 5])).toBe(`(request.time.toMillis() - request.resource.data.map.id.seconds() * 1000) < duration.value(5, "s")`);
    });

    test("minutes", () => {
      expect(RenderFields([["field", ["map", "id"]], "withinRequest", "minutes", 5])).toBe(`(request.time.toMillis() - resource.data.map.id.seconds() * 1000) < duration.value(5, "m")`);
      expect(RenderFields([["updateField", ["map", "id"]], "withinRequest", "minutes", 5])).toBe(`(request.time.toMillis() - request.resource.data.map.id.seconds() * 1000) < duration.value(5, "m")`);
    });

    test("hours", () => {
      expect(RenderFields([["field", ["map", "id"]], "withinRequest", "hours", 5])).toBe(`(request.time.toMillis() - resource.data.map.id.seconds() * 1000) < duration.value(5, "h")`);
      expect(RenderFields([["updateField", ["map", "id"]], "withinRequest", "hours", 5])).toBe(`(request.time.toMillis() - request.resource.data.map.id.seconds() * 1000) < duration.value(5, "h")`);
    });

    test("days", () => {
      expect(RenderFields([["field", ["map", "id"]], "withinRequest", "days", 5])).toBe(`(request.time.toMillis() - resource.data.map.id.seconds() * 1000) < duration.value(5, "d")`);
      expect(RenderFields([["updateField", ["map", "id"]], "withinRequest", "days", 5])).toBe(`(request.time.toMillis() - request.resource.data.map.id.seconds() * 1000) < duration.value(5, "d")`);
    });
  });
});

describe("conditions.Number", () => {
  describe("logic", () => {
    test("==", () => {
      expect(RenderFields([["field", ["map", "id"]], "==", 5])).toBe(`resource.data.map.id == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "==", 5])).toBe(`request.resource.data.map.id == 5`);
    });

    test("!==", () => {
      expect(RenderFields([["field", ["map", "id"]], "!==", 5])).toBe(`resource.data.map.id !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "!==", 5])).toBe(`request.resource.data.map.id !== 5`);
    });

    test("<", () => {
      expect(RenderFields([["field", ["map", "id"]], "<", 5])).toBe(`resource.data.map.id < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "<", 5])).toBe(`request.resource.data.map.id < 5`);
    });

    test(">", () => {
      expect(RenderFields([["field", ["map", "id"]], ">", 5])).toBe(`resource.data.map.id > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], ">", 5])).toBe(`request.resource.data.map.id > 5`);
    });

    test("<=", () => {
      expect(RenderFields([["field", ["map", "id"]], "<=", 5])).toBe(`resource.data.map.id <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "<=", 5])).toBe(`request.resource.data.map.id <= 5`);
    });

    test(">=", () => {
      expect(RenderFields([["field", ["map", "id"]], ">=", 5])).toBe(`resource.data.map.id >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], ">=", 5])).toBe(`request.resource.data.map.id >= 5`);
    });
  });

  test("in", () => {
    expect(RenderFields([["field", ["map", "id"]], "in", [1,2,3]])).toBe(`resource.data.map.id in [1,2,3]`);
    expect(RenderFields([["updateField", ["map", "id"]], "in", [1,2,3]])).toBe(`request.resource.data.map.id in [1,2,3]`);
  });

  test("isInteger", () => {
    expect(RenderFields([["field", ["map", "id"]], "isInteger"])).toBe(`int(resource.data.map.id) === resource.data.map.id`);
    expect(RenderFields([["updateField", ["map", "id"]], "isInteger"])).toBe(`int(request.resource.data.map.id) === request.resource.data.map.id`);
  });

  test("isFloat", () => {
    expect(RenderFields([["field", ["map", "id"]], "isFloat"])).toBe(`float(resource.data.map.id) === resource.data.map.id`);
    expect(RenderFields([["updateField", ["map", "id"]], "isFloat"])).toBe(`float(request.resource.data.map.id) === request.resource.data.map.id`);
  });
});

describe("conditions.String", () => {
  describe("paramLogic", () => {
    test("==", () => {
      expect(RenderFields([["field", ["map", "id"]], "==", ["param", "uid"]])).toBe(`resource.data.map.id == uid`);
      expect(RenderFields([["updateField", ["map", "id"]], "==", ["param", "uid"]])).toBe(`request.resource.data.map.id == uid`);
    });

    test("!==", () => {
      expect(RenderFields([["field", ["map", "id"]], "!==", ["param", "uid"]])).toBe(`resource.data.map.id !== uid`);
      expect(RenderFields([["updateField", ["map", "id"]], "!==", ["param", "uid"]])).toBe(`request.resource.data.map.id !== uid`);
    });
  });

  describe("logic", () => {
    test("==", () => {
      expect(RenderFields([["field", ["map", "id"]], "==", "abc"])).toBe(`resource.data.map.id == "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "==", "abc"])).toBe(`request.resource.data.map.id == "abc"`);
    });

    test("!==", () => {
      expect(RenderFields([["field", ["map", "id"]], "!==", "abc"])).toBe(`resource.data.map.id !== "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "!==", "abc"])).toBe(`request.resource.data.map.id !== "abc"`);
    });
  });

  describe("size", () => {
    test("==", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "==", 5])).toBe(`resource.data.map.id.size() == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "==", 5])).toBe(`request.resource.data.map.id.size() == 5`);
    });

    test("!==", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "!==", 5])).toBe(`resource.data.map.id.size() !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "!==", 5])).toBe(`request.resource.data.map.id.size() !== 5`);
    });

    test("<", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "<", 5])).toBe(`resource.data.map.id.size() < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<", 5])).toBe(`request.resource.data.map.id.size() < 5`);
    });

    test(">", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", ">", 5])).toBe(`resource.data.map.id.size() > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">", 5])).toBe(`request.resource.data.map.id.size() > 5`);
    });

    test("<=", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "<=", 5])).toBe(`resource.data.map.id.size() <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<=", 5])).toBe(`request.resource.data.map.id.size() <= 5`);
    });

    test(">=", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", ">=", 5])).toBe(`resource.data.map.id.size() >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">=", 5])).toBe(`request.resource.data.map.id.size() >= 5`);
    });
  });

  test("in", () => {
    expect(RenderFields([["field", ["map", "id"]], "in", ["ab","cd","ef"]])).toBe(`resource.data.map.id in ["ab","cd","ef"]`);
    expect(RenderFields([["updateField", ["map", "id"]], "in", ["ab","cd","ef"]])).toBe(`request.resource.data.map.id in ["ab","cd","ef"]`);
  });
});

describe("conditions.LatLng", () => {
  describe("distanceTo", () => {
    test("specfic latlng", () => {
      expect(RenderFields([["field", ["map", "id"]], "distanceTo", ["latlng", 51, 23], "==", 5])).toBe(`resource.data.map.id.distance(latlng.value(51, 23)) == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "distanceTo", ["latlng", 51, 23], "==", 5])).toBe(`request.resource.data.map.id.distance(latlng.value(51, 23)) == 5`);
    });

    test("latlng from field", () => {
      expect(RenderFields([["field", ["map", "id"]], "distanceTo", ["field", ["map", "id"]], "==", 5])).toBe(`resource.data.map.id.distance(resource.data.map.id) == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "distanceTo", ["field", ["map", "id"]], "==", 5])).toBe(`request.resource.data.map.id.distance(resource.data.map.id) == 5`);
      expect(RenderFields([["field", ["map", "id"]], "distanceTo", ["updateField", ["map", "id"]], "==", 5])).toBe(`resource.data.map.id.distance(request.resource.data.map.id) == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "distanceTo", ["updateField", ["map", "id"]], "==", 5])).toBe(`request.resource.data.map.id.distance(request.resource.data.map.id) == 5`);
    });

    test("latlng from doc field", () => {
      expect(RenderFields([["field", ["map", "id"]], "distanceTo", ["doc", ["users", "uid"], ["field", ["map", "id"]]], "==", 5])).toBe(`resource.data.map.id.distance(get(/databases/$(database)/documents/users/uid).data.map.id) == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "distanceTo", ["doc", ["users", "uid"], ["field", ["map", "id"]]], "==", 5])).toBe(`request.resource.data.map.id.distance(get(/databases/$(database)/documents/users/uid).data.map.id) == 5`);
    });
  });
});

describe("conditions.Map", () => {
  describe("size", () => {
    test("==", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "==", 5])).toBe(`resource.data.map.id.size() == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "==", 5])).toBe(`request.resource.data.map.id.size() == 5`);
    });

    test("!==", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "!==", 5])).toBe(`resource.data.map.id.size() !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "!==", 5])).toBe(`request.resource.data.map.id.size() !== 5`);
    });

    test("<", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "<", 5])).toBe(`resource.data.map.id.size() < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<", 5])).toBe(`request.resource.data.map.id.size() < 5`);
    });

    test(">", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", ">", 5])).toBe(`resource.data.map.id.size() > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">", 5])).toBe(`request.resource.data.map.id.size() > 5`);
    });

    test("<=", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "<=", 5])).toBe(`resource.data.map.id.size() <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<=", 5])).toBe(`request.resource.data.map.id.size() <= 5`);
    });

    test(">=", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", ">=", 5])).toBe(`resource.data.map.id.size() >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">=", 5])).toBe(`request.resource.data.map.id.size() >= 5`);
    });
  });

  describe("get", () => {
    test("==", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", "id", "==", 5])).toBe(`resource.data.map.id.id == 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], "==", 5])).toBe(`resource.data.map.id[uid] == 5`);

      expect(RenderFields([["field", ["map", "id"]], "get", "id", "==", "abc"])).toBe(`resource.data.map.id.id == "abc"`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], "==", "abc"])).toBe(`resource.data.map.id[uid] == "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "==", 5])).toBe(`request.resource.data.map.id.id == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "==", 5])).toBe(`request.resource.data.map.id[uid] == 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "==", "abc"])).toBe(`request.resource.data.map.id.id == "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "==", "abc"])).toBe(`request.resource.data.map.id[uid] == "abc"`);
    });

    test("!==", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", "id", "!==", 5])).toBe(`resource.data.map.id.id !== 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], "!==", 5])).toBe(`resource.data.map.id[uid] !== 5`);

      expect(RenderFields([["field", ["map", "id"]], "get", "id", "!==", "abc"])).toBe(`resource.data.map.id.id !== "abc"`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], "!==", "abc"])).toBe(`resource.data.map.id[uid] !== "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "!==", 5])).toBe(`request.resource.data.map.id.id !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "!==", 5])).toBe(`request.resource.data.map.id[uid] !== 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "!==", "abc"])).toBe(`request.resource.data.map.id.id !== "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "!==", "abc"])).toBe(`request.resource.data.map.id[uid] !== "abc"`);
    });

    test("<", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", "id", "<", 5])).toBe(`resource.data.map.id.id < 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], "<", 5])).toBe(`resource.data.map.id[uid] < 5`);

      expect(RenderFields([["field", ["map", "id"]], "get", "id", "<", "abc"])).toBe(`resource.data.map.id.id < "abc"`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], "<", "abc"])).toBe(`resource.data.map.id[uid] < "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "<", 5])).toBe(`request.resource.data.map.id.id < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "<", 5])).toBe(`request.resource.data.map.id[uid] < 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "<", "abc"])).toBe(`request.resource.data.map.id.id < "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "<", "abc"])).toBe(`request.resource.data.map.id[uid] < "abc"`);
    });

    test(">", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", "id", ">", 5])).toBe(`resource.data.map.id.id > 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], ">", 5])).toBe(`resource.data.map.id[uid] > 5`);

      expect(RenderFields([["field", ["map", "id"]], "get", "id", ">", "abc"])).toBe(`resource.data.map.id.id > "abc"`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], ">", "abc"])).toBe(`resource.data.map.id[uid] > "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", ">", 5])).toBe(`request.resource.data.map.id.id > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], ">", 5])).toBe(`request.resource.data.map.id[uid] > 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", ">", "abc"])).toBe(`request.resource.data.map.id.id > "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], ">", "abc"])).toBe(`request.resource.data.map.id[uid] > "abc"`);
    });

    test("<=", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", "id", "<=", 5])).toBe(`resource.data.map.id.id <= 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], "<=", 5])).toBe(`resource.data.map.id[uid] <= 5`);

      expect(RenderFields([["field", ["map", "id"]], "get", "id", "<=", "abc"])).toBe(`resource.data.map.id.id <= "abc"`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], "<=", "abc"])).toBe(`resource.data.map.id[uid] <= "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "<=", 5])).toBe(`request.resource.data.map.id.id <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "<=", 5])).toBe(`request.resource.data.map.id[uid] <= 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "<=", "abc"])).toBe(`request.resource.data.map.id.id <= "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "<=", "abc"])).toBe(`request.resource.data.map.id[uid] <= "abc"`);
    });

    test(">=", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", "id", ">=", 5])).toBe(`resource.data.map.id.id >= 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], ">=", 5])).toBe(`resource.data.map.id[uid] >= 5`);

      expect(RenderFields([["field", ["map", "id"]], "get", "id", ">=", "abc"])).toBe(`resource.data.map.id.id >= "abc"`);
      expect(RenderFields([["field", ["map", "id"]], "get", ["param", "uid"], ">=", "abc"])).toBe(`resource.data.map.id[uid] >= "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", ">=", 5])).toBe(`request.resource.data.map.id.id >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], ">=", 5])).toBe(`request.resource.data.map.id[uid] >= 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", ">=", "abc"])).toBe(`request.resource.data.map.id.id >= "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], ">=", "abc"])).toBe(`request.resource.data.map.id[uid] >= "abc"`);
    });
  });

  describe("keys", () => {
    test("hasAll", () => {
      expect(RenderFields([["field", ["map", "id"]], "keys", "hasAll", ["abc", "efg"]])).toBe(`resource.data.map.id.keys().hasAll(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "keys", "hasAll", ["abc", "efg"]])).toBe(`request.resource.data.map.id.keys().hasAll(["abc","efg"])`);
    });

    test("hasAny", () => {
      expect(RenderFields([["field", ["map", "id"]], "keys", "hasAny", ["abc", "efg"]])).toBe(`resource.data.map.id.keys().hasAny(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "keys", "hasAny", ["abc", "efg"]])).toBe(`request.resource.data.map.id.keys().hasAny(["abc","efg"])`);
    });

    test("hasOnly", () => {
      expect(RenderFields([["field", ["map", "id"]], "keys", "hasOnly", ["abc", "efg"]])).toBe(`resource.data.map.id.keys().hasOnly(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "keys", "hasOnly", ["abc", "efg"]])).toBe(`request.resource.data.map.id.keys().hasOnly(["abc","efg"])`);
    });
  });

  describe("values", () => {
    test("hasAll", () => {
      expect(RenderFields([["field", ["map", "id"]], "values", "hasAll", ["abc", "efg"]])).toBe(`resource.data.map.id.values().hasAll(["abc","efg"])`);
      expect(RenderFields([["field", ["map", "id"]], "values", "hasAll", [0, 1]])).toBe(`resource.data.map.id.values().hasAll([0,1])`);
      expect(RenderFields([["field", ["map", "id"]], "values", "hasAll", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.values().hasAll([0,1,"abc","efg"])`);

      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAll", ["abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasAll(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAll", [0, 1]])).toBe(`request.resource.data.map.id.values().hasAll([0,1])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAll", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasAll([0,1,"abc","efg"])`);
    });

    test("hasAny", () => {
      expect(RenderFields([["field", ["map", "id"]], "values", "hasAny", ["abc", "efg"]])).toBe(`resource.data.map.id.values().hasAny(["abc","efg"])`);
      expect(RenderFields([["field", ["map", "id"]], "values", "hasAny", [0, 1]])).toBe(`resource.data.map.id.values().hasAny([0,1])`);
      expect(RenderFields([["field", ["map", "id"]], "values", "hasAny", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.values().hasAny([0,1,"abc","efg"])`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAny", ["abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasAny(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAny", [0, 1]])).toBe(`request.resource.data.map.id.values().hasAny([0,1])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAny", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasAny([0,1,"abc","efg"])`);
    });

    test("hasOnly", () => {
      expect(RenderFields([["field", ["map", "id"]], "values", "hasOnly", ["abc", "efg"]])).toBe(`resource.data.map.id.values().hasOnly(["abc","efg"])`);
      expect(RenderFields([["field", ["map", "id"]], "values", "hasOnly", [0, 1]])).toBe(`resource.data.map.id.values().hasOnly([0,1])`);
      expect(RenderFields([["field", ["map", "id"]], "values", "hasOnly", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.values().hasOnly([0,1,"abc","efg"])`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasOnly", ["abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasOnly(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasOnly", [0, 1]])).toBe(`request.resource.data.map.id.values().hasOnly([0,1])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasOnly", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasOnly([0,1,"abc","efg"])`);
    });
  });

  // describe("diff", () => {
  //   describe("addedKeys", () => {
  //     test("hasAll", () => {
  //       expect(RenderFields([["field", ["map", "id"]], "diff", "addedKeys", "hasAll", ["abc"]])).toBe(`resource.data.map.id.values().hasAll([\"abc\",\"efg\"])`);
  //       expect(RenderFields([["updateField", ["map", "id"]], "diff", "addedKeys", "hasAll", ["abc"]])).toBe(`request.resource.data.map.id.values().hasAll([\"abc\",\"efg\"])`);
  //     });

  //     test("hasAny", () => {
  //       expect(RenderFields([["field", ["map", "id"]], "diff", "addedKeys", "hasAny", ["abc"]])).toBe(`resource.data.map.id.values().hasAll(["abc","efg"])`);
  //       expect(RenderFields([["updateField", ["map", "id"]], "diff", "addedKeys", "hasAny", ["abc"]])).toBe(`request.resource.data.map.id.values().hasAll(["abc","efg"])`);
  //     });

  //     test("hasOnly", () => {
  //       expect(RenderFields([["field", ["map", "id"]], "diff", "addedKeys", "hasOnly", ["abc"]])).toBe(`resource.data.map.id.values().hasAll(["abc","efg"])`);
  //       expect(RenderFields([["updateField", ["map", "id"]], "diff", "addedKeys", "hasOnly", ["abc"]])).toBe(`request.resource.data.map.id.values().hasAll(["abc","efg"])`);
  //     });
  //   });
  // });
});

// export type Map =
//   [Field, "diff", "addedKeys"|"effectedKeys"|"changedKeys"|"unchangedKeys", "hasAll"|"hasAny"|"hasOnly", string[]];



describe("List", () => {
  describe("size", () => {
    test("==", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "==", 5])).toBe(`resource.data.map.id.size() == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "==", 5])).toBe(`request.resource.data.map.id.size() == 5`);
    });

    test("!==", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "!==", 5])).toBe(`resource.data.map.id.size() !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "!==", 5])).toBe(`request.resource.data.map.id.size() !== 5`);
    });

    test("<", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "<", 5])).toBe(`resource.data.map.id.size() < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<", 5])).toBe(`request.resource.data.map.id.size() < 5`);
    });

    test(">", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", ">", 5])).toBe(`resource.data.map.id.size() > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">", 5])).toBe(`request.resource.data.map.id.size() > 5`);
    });

    test("<=", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", "<=", 5])).toBe(`resource.data.map.id.size() <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<=", 5])).toBe(`request.resource.data.map.id.size() <= 5`);
    });

    test(">=", () => {
      expect(RenderFields([["field", ["map", "id"]], "size", ">=", 5])).toBe(`resource.data.map.id.size() >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">=", 5])).toBe(`request.resource.data.map.id.size() >= 5`);
    });
  });

  describe("get", () => {
    test("==", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", 5, "==", 5])).toBe(`resource.data.map.id[5] == 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", 5, "==", "abc"])).toBe(`resource.data.map.id[5] == "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "==", 5])).toBe(`request.resource.data.map.id[5] == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "==", "abc"])).toBe(`request.resource.data.map.id[5] == "abc"`);
    });

    test("!==", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", 5, "!==", 5])).toBe(`resource.data.map.id[5] !== 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", 5, "!==", "abc"])).toBe(`resource.data.map.id[5] !== "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "!==", 5])).toBe(`request.resource.data.map.id[5] !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "!==", "abc"])).toBe(`request.resource.data.map.id[5] !== "abc"`);
    });

    test("<", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", 5, "<", 5])).toBe(`resource.data.map.id[5] < 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", 5, "<", "abc"])).toBe(`resource.data.map.id[5] < "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "<", 5])).toBe(`request.resource.data.map.id[5] < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "<", "abc"])).toBe(`request.resource.data.map.id[5] < "abc"`);
    });

    test(">", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", 5, ">", 5])).toBe(`resource.data.map.id[5] > 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", 5, ">", "abc"])).toBe(`resource.data.map.id[5] > "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, ">", 5])).toBe(`request.resource.data.map.id[5] > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, ">", "abc"])).toBe(`request.resource.data.map.id[5] > "abc"`);
    });

    test("<=", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", 5, "<=", 5])).toBe(`resource.data.map.id[5] <= 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", 5, "<=", "abc"])).toBe(`resource.data.map.id[5] <= "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "<=", 5])).toBe(`request.resource.data.map.id[5] <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "<=", "abc"])).toBe(`request.resource.data.map.id[5] <= "abc"`);
    });

    test(">=", () => {
      expect(RenderFields([["field", ["map", "id"]], "get", 5, ">=", 5])).toBe(`resource.data.map.id[5] >= 5`);
      expect(RenderFields([["field", ["map", "id"]], "get", 5, ">=", "abc"])).toBe(`resource.data.map.id[5] >= "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, ">=", 5])).toBe(`request.resource.data.map.id[5] >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, ">=", "abc"])).toBe(`request.resource.data.map.id[5] >= "abc"`);
    });
  });
  
  test("hasAll", () => {
    expect(RenderFields([["field", ["map", "id"]], "hasAll", ["abc", "efg"]])).toBe(`resource.data.map.id.set().hasAll(["abc","efg"])`);
    expect(RenderFields([["field", ["map", "id"]], "hasAll", [0, 1]])).toBe(`resource.data.map.id.set().hasAll([0,1])`);
    expect(RenderFields([["field", ["map", "id"]], "hasAll", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.set().hasAll([0,1,"abc","efg"])`);
    
    expect(RenderFields([["updateField", ["map", "id"]], "hasAll", ["abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasAll(["abc","efg"])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasAll", [0, 1]])).toBe(`request.resource.data.map.id.set().hasAll([0,1])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasAll", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasAll([0,1,"abc","efg"])`);
  });

  test("hasAny", () => {
    expect(RenderFields([["field", ["map", "id"]], "hasAny", ["abc", "efg"]])).toBe(`resource.data.map.id.set().hasAny(["abc","efg"])`);
    expect(RenderFields([["field", ["map", "id"]], "hasAny", [0, 1]])).toBe(`resource.data.map.id.set().hasAny([0,1])`);
    expect(RenderFields([["field", ["map", "id"]], "hasAny", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.set().hasAny([0,1,"abc","efg"])`);
    
    expect(RenderFields([["updateField", ["map", "id"]], "hasAny", ["abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasAny(["abc","efg"])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasAny", [0, 1]])).toBe(`request.resource.data.map.id.set().hasAny([0,1])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasAny", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasAny([0,1,"abc","efg"])`);
  });

  test("hasOnly", () => {
    expect(RenderFields([["field", ["map", "id"]], "hasOnly", ["abc", "efg"]])).toBe(`resource.data.map.id.set().hasOnly(["abc","efg"])`);
    expect(RenderFields([["field", ["map", "id"]], "hasOnly", [0, 1]])).toBe(`resource.data.map.id.set().hasOnly([0,1])`);
    expect(RenderFields([["field", ["map", "id"]], "hasOnly", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.set().hasOnly([0,1,"abc","efg"])`);
    
    expect(RenderFields([["updateField", ["map", "id"]], "hasOnly", ["abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasOnly(["abc","efg"])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasOnly", [0, 1]])).toBe(`request.resource.data.map.id.set().hasOnly([0,1])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasOnly", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasOnly([0,1,"abc","efg"])`);
  });
});

// export type ConditionGroup = {
//   operation: "&&"|"||",
//   conditions: (SingleCondition|ConditionGroup)[]
// };

describe("ConditionGroup", () => {
  test("&&", () => {
    expect(
      RenderFieldGroup({
        operation: "&&",
        conditions: []
      })
    ).toBe(`true`);

    expect(
      RenderFieldGroup({
        operation: "&&",
        conditions: [
          ["field", ["users", "userABC"]]
        ]
      })
    ).toBe(`resource.data.users.userABC`);
      
    expect(
      RenderFieldGroup({
        operation: "&&",
        conditions: [
          ["updateField", ["users", "userABC"]]
        ]
      })
    ).toBe(`request.resource.data.users.userABC`);

    expect(
      RenderFieldGroup({
        operation: "&&",
        conditions: [
          ["field", ["users", "userABC"]],
          ["field", ["users", "userABC"]]
        ]
      })
    ).toBe(`( resource.data.users.userABC && resource.data.users.userABC )`);

    expect(
      RenderFieldGroup({
        operation: "&&",
        conditions: [
          ["updateField", ["users", "userABC"]],
          ["updateField", ["users", "userABC"]]
        ]
      })
    ).toBe(`( request.resource.data.users.userABC && request.resource.data.users.userABC )`);

    expect(
      RenderFieldGroup({
        operation: "&&",
        conditions: [
          ["field", ["users", "userABC"]],
          ["updateField", ["users", "userABC"]]
        ]
      })
    ).toBe(`( resource.data.users.userABC && request.resource.data.users.userABC )`);
  });

  test("||", () => {
    expect(
      RenderFieldGroup({
        operation: "||",
        conditions: []
      })
    ).toBe(`true`);

    expect(
      RenderFieldGroup({
        operation: "||",
        conditions: [
          ["field", ["users", "userABC"]]
        ]
      })
    ).toBe(`resource.data.users.userABC`);

    expect(
      RenderFieldGroup({
        operation: "||",
        conditions: [
          ["updateField", ["users", "userABC"]]
        ]
      })
    ).toBe(`request.resource.data.users.userABC`);

    expect(
      RenderFieldGroup({
        operation: "||",
        conditions: [
          ["field", ["users", "userABC"]],
          ["field", ["users", "userABC"]]
        ]
      })
    ).toBe(`( resource.data.users.userABC || resource.data.users.userABC )`);

    expect(
      RenderFieldGroup({
        operation: "||",
        conditions: [
          ["updateField", ["users", "userABC"]],
          ["updateField", ["users", "userABC"]]
        ]
      })
    ).toBe(`( request.resource.data.users.userABC || request.resource.data.users.userABC )`);

    expect(
      RenderFieldGroup({
        operation: "||",
        conditions: [
          ["updateField", ["users", "userABC"]],
          ["field", ["users", "userABC"]]
        ]
      })
    ).toBe(`( request.resource.data.users.userABC || resource.data.users.userABC )`);
  });
});