import { RenderFields } from "./ConditionsProcessor";

describe("conditions.Boolean", () => {
  test("field", () => {
    expect(RenderFields(["doc", ["map", "id"]])).toBe(`resource.data.map.id`);
    expect(RenderFields(["updateField", ["map", "id"]])).toBe(`request.resource.data.map.id`);
  });
  
  test("document", () => {
    expect(RenderFields(["externalDoc", ["collectionName", "docId"], ["fieldId", "id"]])).toBe(`get(/databases/$(database)/documents/collectionName/docId).data.fieldId.id`);
  });
  
  test("document with params", () => {
    expect(RenderFields(["externalDoc", ["collectionName", ["param", "uid"]], ["fieldId", "id"]])).toBe(`get(/databases/$(database)/documents/collectionName/$(uid)).data.fieldId.id`);
  });
});

describe("conditions.Timestamp", () => {
  describe("withinRequest", () => {
    test("seconds", () => {
      expect(RenderFields([["doc", ["map", "id"]], "withinRequest", "seconds", 5])).toBe(`(request.time.toMillis() - resource.data.map.id.seconds() * 1000) < duration.value(5, "s")`);
      expect(RenderFields([["updateField", ["map", "id"]], "withinRequest", "seconds", 5])).toBe(`(request.time.toMillis() - request.resource.data.map.id.seconds() * 1000) < duration.value(5, "s")`);
    });

    test("minutes", () => {
      expect(RenderFields([["doc", ["map", "id"]], "withinRequest", "minutes", 5])).toBe(`(request.time.toMillis() - resource.data.map.id.seconds() * 1000) < duration.value(5, "m")`);
      expect(RenderFields([["updateField", ["map", "id"]], "withinRequest", "minutes", 5])).toBe(`(request.time.toMillis() - request.resource.data.map.id.seconds() * 1000) < duration.value(5, "m")`);
    });

    test("hours", () => {
      expect(RenderFields([["doc", ["map", "id"]], "withinRequest", "hours", 5])).toBe(`(request.time.toMillis() - resource.data.map.id.seconds() * 1000) < duration.value(5, "h")`);
      expect(RenderFields([["updateField", ["map", "id"]], "withinRequest", "hours", 5])).toBe(`(request.time.toMillis() - request.resource.data.map.id.seconds() * 1000) < duration.value(5, "h")`);
    });

    test("days", () => {
      expect(RenderFields([["doc", ["map", "id"]], "withinRequest", "days", 5])).toBe(`(request.time.toMillis() - resource.data.map.id.seconds() * 1000) < duration.value(5, "d")`);
      expect(RenderFields([["updateField", ["map", "id"]], "withinRequest", "days", 5])).toBe(`(request.time.toMillis() - request.resource.data.map.id.seconds() * 1000) < duration.value(5, "d")`);
    });
  });
});

describe("conditions.Number", () => {
  describe("logic", () => {
    test("==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "==", 5])).toBe(`resource.data.map.id == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "==", 5])).toBe(`request.resource.data.map.id == 5`);
    });

    test("!==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "!==", 5])).toBe(`resource.data.map.id !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "!==", 5])).toBe(`request.resource.data.map.id !== 5`);
    });

    test("<", () => {
      expect(RenderFields([["doc", ["map", "id"]], "<", 5])).toBe(`resource.data.map.id < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "<", 5])).toBe(`request.resource.data.map.id < 5`);
    });

    test(">", () => {
      expect(RenderFields([["doc", ["map", "id"]], ">", 5])).toBe(`resource.data.map.id > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], ">", 5])).toBe(`request.resource.data.map.id > 5`);
    });

    test("<=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "<=", 5])).toBe(`resource.data.map.id <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "<=", 5])).toBe(`request.resource.data.map.id <= 5`);
    });

    test(">=", () => {
      expect(RenderFields([["doc", ["map", "id"]], ">=", 5])).toBe(`resource.data.map.id >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], ">=", 5])).toBe(`request.resource.data.map.id >= 5`);
    });
  });

  test("in", () => {
    expect(RenderFields([["doc", ["map", "id"]], "in", [1,2,3]])).toBe(`resource.data.map.id in [1,2,3]`);
    expect(RenderFields([["updateField", ["map", "id"]], "in", [1,2,3]])).toBe(`request.resource.data.map.id in [1,2,3]`);
  });

  test("isInteger", () => {
    expect(RenderFields([["doc", ["map", "id"]], "isInteger"])).toBe(`int(resource.data.map.id) === resource.data.map.id`);
    expect(RenderFields([["updateField", ["map", "id"]], "isInteger"])).toBe(`int(request.resource.data.map.id) === request.resource.data.map.id`);
  });

  test("isFloat", () => {
    expect(RenderFields([["doc", ["map", "id"]], "isFloat"])).toBe(`float(resource.data.map.id) === resource.data.map.id`);
    expect(RenderFields([["updateField", ["map", "id"]], "isFloat"])).toBe(`float(request.resource.data.map.id) === request.resource.data.map.id`);
  });
});

describe("conditions.String", () => {
  describe("paramLogic", () => {
    test("==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "==", ["param", "uid"]])).toBe(`resource.data.map.id == uid`);
      expect(RenderFields([["updateField", ["map", "id"]], "==", ["param", "uid"]])).toBe(`request.resource.data.map.id == uid`);
    });

    test("!==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "!==", ["param", "uid"]])).toBe(`resource.data.map.id !== uid`);
      expect(RenderFields([["updateField", ["map", "id"]], "!==", ["param", "uid"]])).toBe(`request.resource.data.map.id !== uid`);
    });
  });

  describe("logic", () => {
    test("==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "==", "abc"])).toBe(`resource.data.map.id == "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "==", "abc"])).toBe(`request.resource.data.map.id == "abc"`);
    });

    test("!==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "!==", "abc"])).toBe(`resource.data.map.id !== "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "!==", "abc"])).toBe(`request.resource.data.map.id !== "abc"`);
    });
  });

  describe("size", () => {
    test("==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "==", 5])).toBe(`resource.data.map.id.size() == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "==", 5])).toBe(`request.resource.data.map.id.size() == 5`);
    });

    test("!==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "!==", 5])).toBe(`resource.data.map.id.size() !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "!==", 5])).toBe(`request.resource.data.map.id.size() !== 5`);
    });

    test("<", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "<", 5])).toBe(`resource.data.map.id.size() < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<", 5])).toBe(`request.resource.data.map.id.size() < 5`);
    });

    test(">", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", ">", 5])).toBe(`resource.data.map.id.size() > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">", 5])).toBe(`request.resource.data.map.id.size() > 5`);
    });

    test("<=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "<=", 5])).toBe(`resource.data.map.id.size() <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<=", 5])).toBe(`request.resource.data.map.id.size() <= 5`);
    });

    test(">=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", ">=", 5])).toBe(`resource.data.map.id.size() >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">=", 5])).toBe(`request.resource.data.map.id.size() >= 5`);
    });
  });

  test("in", () => {
    expect(RenderFields([["doc", ["map", "id"]], "in", ["ab","cd","ef"]])).toBe(`resource.data.map.id in ["ab","cd","ef"]`);
    expect(RenderFields([["updateField", ["map", "id"]], "in", ["ab","cd","ef"]])).toBe(`request.resource.data.map.id in ["ab","cd","ef"]`);
  });
});

describe("conditions.LatLng", () => {
  describe("distanceTo", () => {
    test("specfic latlng", () => {
      expect(RenderFields([["doc", ["map", "id"]], "distanceTo", ["latlng", 51, 23], "==", 5])).toBe(`resource.data.map.id.distance(latlng.value(51, 23)) == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "distanceTo", ["latlng", 51, 23], "==", 5])).toBe(`request.resource.data.map.id.distance(latlng.value(51, 23)) == 5`);
    });

    test("latlng from field", () => {
      expect(RenderFields([["doc", ["map", "id"]], "distanceTo", ["doc", ["map", "id"]], "==", 5])).toBe(`resource.data.map.id.distance(resource.data.map.id) == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "distanceTo", ["doc", ["map", "id"]], "==", 5])).toBe(`request.resource.data.map.id.distance(resource.data.map.id) == 5`);
      expect(RenderFields([["doc", ["map", "id"]], "distanceTo", ["updateField", ["map", "id"]], "==", 5])).toBe(`resource.data.map.id.distance(request.resource.data.map.id) == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "distanceTo", ["updateField", ["map", "id"]], "==", 5])).toBe(`request.resource.data.map.id.distance(request.resource.data.map.id) == 5`);
    });

    test("latlng from doc field", () => {
      expect(RenderFields([["doc", ["map", "id"]], "distanceTo", ["externalDoc", ["users", "uid"], ["map", "id"]], "==", 5])).toBe(`resource.data.map.id.distance(get(/databases/$(database)/documents/users/uid).data.map.id) == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "distanceTo", ["externalDoc", ["users", "uid"], ["map", "id"]], "==", 5])).toBe(`request.resource.data.map.id.distance(get(/databases/$(database)/documents/users/uid).data.map.id) == 5`);
    });
  });
});

describe("conditions.Map", () => {
  describe("size", () => {
    test("==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "==", 5])).toBe(`resource.data.map.id.size() == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "==", 5])).toBe(`request.resource.data.map.id.size() == 5`);
    });

    test("!==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "!==", 5])).toBe(`resource.data.map.id.size() !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "!==", 5])).toBe(`request.resource.data.map.id.size() !== 5`);
    });

    test("<", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "<", 5])).toBe(`resource.data.map.id.size() < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<", 5])).toBe(`request.resource.data.map.id.size() < 5`);
    });

    test(">", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", ">", 5])).toBe(`resource.data.map.id.size() > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">", 5])).toBe(`request.resource.data.map.id.size() > 5`);
    });

    test("<=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "<=", 5])).toBe(`resource.data.map.id.size() <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<=", 5])).toBe(`request.resource.data.map.id.size() <= 5`);
    });

    test(">=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", ">=", 5])).toBe(`resource.data.map.id.size() >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">=", 5])).toBe(`request.resource.data.map.id.size() >= 5`);
    });
  });

  describe("get", () => {
    test("==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", "id", "==", 5])).toBe(`resource.data.map.id.id == 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], "==", 5])).toBe(`resource.data.map.id[uid] == 5`);

      expect(RenderFields([["doc", ["map", "id"]], "get", "id", "==", "abc"])).toBe(`resource.data.map.id.id == "abc"`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], "==", "abc"])).toBe(`resource.data.map.id[uid] == "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "==", 5])).toBe(`request.resource.data.map.id.id == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "==", 5])).toBe(`request.resource.data.map.id[uid] == 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "==", "abc"])).toBe(`request.resource.data.map.id.id == "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "==", "abc"])).toBe(`request.resource.data.map.id[uid] == "abc"`);
    });

    test("!==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", "id", "!==", 5])).toBe(`resource.data.map.id.id !== 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], "!==", 5])).toBe(`resource.data.map.id[uid] !== 5`);

      expect(RenderFields([["doc", ["map", "id"]], "get", "id", "!==", "abc"])).toBe(`resource.data.map.id.id !== "abc"`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], "!==", "abc"])).toBe(`resource.data.map.id[uid] !== "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "!==", 5])).toBe(`request.resource.data.map.id.id !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "!==", 5])).toBe(`request.resource.data.map.id[uid] !== 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "!==", "abc"])).toBe(`request.resource.data.map.id.id !== "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "!==", "abc"])).toBe(`request.resource.data.map.id[uid] !== "abc"`);
    });

    test("<", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", "id", "<", 5])).toBe(`resource.data.map.id.id < 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], "<", 5])).toBe(`resource.data.map.id[uid] < 5`);

      expect(RenderFields([["doc", ["map", "id"]], "get", "id", "<", "abc"])).toBe(`resource.data.map.id.id < "abc"`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], "<", "abc"])).toBe(`resource.data.map.id[uid] < "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "<", 5])).toBe(`request.resource.data.map.id.id < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "<", 5])).toBe(`request.resource.data.map.id[uid] < 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "<", "abc"])).toBe(`request.resource.data.map.id.id < "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "<", "abc"])).toBe(`request.resource.data.map.id[uid] < "abc"`);
    });

    test(">", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", "id", ">", 5])).toBe(`resource.data.map.id.id > 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], ">", 5])).toBe(`resource.data.map.id[uid] > 5`);

      expect(RenderFields([["doc", ["map", "id"]], "get", "id", ">", "abc"])).toBe(`resource.data.map.id.id > "abc"`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], ">", "abc"])).toBe(`resource.data.map.id[uid] > "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", ">", 5])).toBe(`request.resource.data.map.id.id > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], ">", 5])).toBe(`request.resource.data.map.id[uid] > 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", ">", "abc"])).toBe(`request.resource.data.map.id.id > "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], ">", "abc"])).toBe(`request.resource.data.map.id[uid] > "abc"`);
    });

    test("<=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", "id", "<=", 5])).toBe(`resource.data.map.id.id <= 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], "<=", 5])).toBe(`resource.data.map.id[uid] <= 5`);

      expect(RenderFields([["doc", ["map", "id"]], "get", "id", "<=", "abc"])).toBe(`resource.data.map.id.id <= "abc"`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], "<=", "abc"])).toBe(`resource.data.map.id[uid] <= "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "<=", 5])).toBe(`request.resource.data.map.id.id <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "<=", 5])).toBe(`request.resource.data.map.id[uid] <= 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", "<=", "abc"])).toBe(`request.resource.data.map.id.id <= "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], "<=", "abc"])).toBe(`request.resource.data.map.id[uid] <= "abc"`);
    });

    test(">=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", "id", ">=", 5])).toBe(`resource.data.map.id.id >= 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], ">=", 5])).toBe(`resource.data.map.id[uid] >= 5`);

      expect(RenderFields([["doc", ["map", "id"]], "get", "id", ">=", "abc"])).toBe(`resource.data.map.id.id >= "abc"`);
      expect(RenderFields([["doc", ["map", "id"]], "get", ["param", "uid"], ">=", "abc"])).toBe(`resource.data.map.id[uid] >= "abc"`);

      
      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", ">=", 5])).toBe(`request.resource.data.map.id.id >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], ">=", 5])).toBe(`request.resource.data.map.id[uid] >= 5`);

      expect(RenderFields([["updateField", ["map", "id"]], "get", "id", ">=", "abc"])).toBe(`request.resource.data.map.id.id >= "abc"`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", ["param", "uid"], ">=", "abc"])).toBe(`request.resource.data.map.id[uid] >= "abc"`);
    });
  });

  describe("keys", () => {
    test("hasAll", () => {
      expect(RenderFields([["doc", ["map", "id"]], "keys", "hasAll", ["abc", "efg"]])).toBe(`resource.data.map.id.keys().hasAll(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "keys", "hasAll", ["abc", "efg"]])).toBe(`request.resource.data.map.id.keys().hasAll(["abc","efg"])`);
    });

    test("hasAny", () => {
      expect(RenderFields([["doc", ["map", "id"]], "keys", "hasAny", ["abc", "efg"]])).toBe(`resource.data.map.id.keys().hasAny(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "keys", "hasAny", ["abc", "efg"]])).toBe(`request.resource.data.map.id.keys().hasAny(["abc","efg"])`);
    });

    test("hasOnly", () => {
      expect(RenderFields([["doc", ["map", "id"]], "keys", "hasOnly", ["abc", "efg"]])).toBe(`resource.data.map.id.keys().hasOnly(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "keys", "hasOnly", ["abc", "efg"]])).toBe(`request.resource.data.map.id.keys().hasOnly(["abc","efg"])`);
    });
  });

  describe("values", () => {
    test("hasAll", () => {
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasAll", ["abc", "efg"]])).toBe(`resource.data.map.id.values().hasAll(["abc","efg"])`);
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasAll", [0, 1]])).toBe(`resource.data.map.id.values().hasAll([0,1])`);
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasAll", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.values().hasAll([0,1,"abc","efg"])`);

      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAll", ["abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasAll(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAll", [0, 1]])).toBe(`request.resource.data.map.id.values().hasAll([0,1])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAll", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasAll([0,1,"abc","efg"])`);
    });

    test("hasAny", () => {
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasAny", ["abc", "efg"]])).toBe(`resource.data.map.id.values().hasAny(["abc","efg"])`);
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasAny", [0, 1]])).toBe(`resource.data.map.id.values().hasAny([0,1])`);
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasAny", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.values().hasAny([0,1,"abc","efg"])`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAny", ["abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasAny(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAny", [0, 1]])).toBe(`request.resource.data.map.id.values().hasAny([0,1])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasAny", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasAny([0,1,"abc","efg"])`);
    });

    test("hasOnly", () => {
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasOnly", ["abc", "efg"]])).toBe(`resource.data.map.id.values().hasOnly(["abc","efg"])`);
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasOnly", [0, 1]])).toBe(`resource.data.map.id.values().hasOnly([0,1])`);
      expect(RenderFields([["doc", ["map", "id"]], "values", "hasOnly", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.values().hasOnly([0,1,"abc","efg"])`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasOnly", ["abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasOnly(["abc","efg"])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasOnly", [0, 1]])).toBe(`request.resource.data.map.id.values().hasOnly([0,1])`);
      expect(RenderFields([["updateField", ["map", "id"]], "values", "hasOnly", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.values().hasOnly([0,1,"abc","efg"])`);
    });
  });

  describe("diff", () => {
    describe("addedKeys", () => {
      test("hasAll", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "addedKeys", "hasAll", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).addedKeys().hasAll(["abc","efg"])`);
      });

      test("hasAny", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "addedKeys", "hasAny", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).addedKeys().hasAny(["abc","efg"])`);
      });

      test("hasOnly", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "addedKeys", "hasOnly", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).addedKeys().hasOnly(["abc","efg"])`);
      });
    });

    describe("effectedKeys", () => {
      test("hasAll", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "effectedKeys", "hasAll", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).effectedKeys().hasAll(["abc","efg"])`);
      });

      test("hasAny", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "effectedKeys", "hasAny", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).effectedKeys().hasAny(["abc","efg"])`);
      });

      test("hasOnly", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "effectedKeys", "hasOnly", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).effectedKeys().hasOnly(["abc","efg"])`);
      });
    });
    
    describe("changedKeys", () => {
      test("hasAll", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "changedKeys", "hasAll", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).changedKeys().hasAll(["abc","efg"])`);
      });

      test("hasAny", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "changedKeys", "hasAny", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).changedKeys().hasAny(["abc","efg"])`);
      });

      test("hasOnly", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "changedKeys", "hasOnly", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).changedKeys().hasOnly(["abc","efg"])`);
      });
    });
    
    describe("unchangedKeys", () => {
      test("hasAll", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "unchangedKeys", "hasAll", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).unchangedKeys().hasAll(["abc","efg"])`);
      });

      test("hasAny", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "unchangedKeys", "hasAny", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).unchangedKeys().hasAny(["abc","efg"])`);
      });

      test("hasOnly", () => {
        expect(RenderFields([["doc", ["map", "id"]], "diff", "unchangedKeys", "hasOnly", ["abc","efg"]])).toBe(`resource.data.map.id.diff(request.resource.data.map.id).unchangedKeys().hasOnly(["abc","efg"])`);
      });
    });
  });
});

describe("List", () => {
  describe("size", () => {
    test("==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "==", 5])).toBe(`resource.data.map.id.size() == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "==", 5])).toBe(`request.resource.data.map.id.size() == 5`);
    });

    test("!==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "!==", 5])).toBe(`resource.data.map.id.size() !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "!==", 5])).toBe(`request.resource.data.map.id.size() !== 5`);
    });

    test("<", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "<", 5])).toBe(`resource.data.map.id.size() < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<", 5])).toBe(`request.resource.data.map.id.size() < 5`);
    });

    test(">", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", ">", 5])).toBe(`resource.data.map.id.size() > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">", 5])).toBe(`request.resource.data.map.id.size() > 5`);
    });

    test("<=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", "<=", 5])).toBe(`resource.data.map.id.size() <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", "<=", 5])).toBe(`request.resource.data.map.id.size() <= 5`);
    });

    test(">=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "size", ">=", 5])).toBe(`resource.data.map.id.size() >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "size", ">=", 5])).toBe(`request.resource.data.map.id.size() >= 5`);
    });
  });

  describe("get", () => {
    test("==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, "==", 5])).toBe(`resource.data.map.id[5] == 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, "==", "abc"])).toBe(`resource.data.map.id[5] == "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "==", 5])).toBe(`request.resource.data.map.id[5] == 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "==", "abc"])).toBe(`request.resource.data.map.id[5] == "abc"`);
    });

    test("!==", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, "!==", 5])).toBe(`resource.data.map.id[5] !== 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, "!==", "abc"])).toBe(`resource.data.map.id[5] !== "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "!==", 5])).toBe(`request.resource.data.map.id[5] !== 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "!==", "abc"])).toBe(`request.resource.data.map.id[5] !== "abc"`);
    });

    test("<", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, "<", 5])).toBe(`resource.data.map.id[5] < 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, "<", "abc"])).toBe(`resource.data.map.id[5] < "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "<", 5])).toBe(`request.resource.data.map.id[5] < 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "<", "abc"])).toBe(`request.resource.data.map.id[5] < "abc"`);
    });

    test(">", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, ">", 5])).toBe(`resource.data.map.id[5] > 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, ">", "abc"])).toBe(`resource.data.map.id[5] > "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, ">", 5])).toBe(`request.resource.data.map.id[5] > 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, ">", "abc"])).toBe(`request.resource.data.map.id[5] > "abc"`);
    });

    test("<=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, "<=", 5])).toBe(`resource.data.map.id[5] <= 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, "<=", "abc"])).toBe(`resource.data.map.id[5] <= "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "<=", 5])).toBe(`request.resource.data.map.id[5] <= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, "<=", "abc"])).toBe(`request.resource.data.map.id[5] <= "abc"`);
    });

    test(">=", () => {
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, ">=", 5])).toBe(`resource.data.map.id[5] >= 5`);
      expect(RenderFields([["doc", ["map", "id"]], "get", 5, ">=", "abc"])).toBe(`resource.data.map.id[5] >= "abc"`);
      
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, ">=", 5])).toBe(`request.resource.data.map.id[5] >= 5`);
      expect(RenderFields([["updateField", ["map", "id"]], "get", 5, ">=", "abc"])).toBe(`request.resource.data.map.id[5] >= "abc"`);
    });
  });
  
  test("hasAll", () => {
    expect(RenderFields([["doc", ["map", "id"]], "hasAll", ["abc", "efg"]])).toBe(`resource.data.map.id.set().hasAll(["abc","efg"])`);
    expect(RenderFields([["doc", ["map", "id"]], "hasAll", [0, 1]])).toBe(`resource.data.map.id.set().hasAll([0,1])`);
    expect(RenderFields([["doc", ["map", "id"]], "hasAll", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.set().hasAll([0,1,"abc","efg"])`);
    
    expect(RenderFields([["updateField", ["map", "id"]], "hasAll", ["abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasAll(["abc","efg"])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasAll", [0, 1]])).toBe(`request.resource.data.map.id.set().hasAll([0,1])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasAll", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasAll([0,1,"abc","efg"])`);
  });

  test("hasAny", () => {
    expect(RenderFields([["doc", ["map", "id"]], "hasAny", ["abc", "efg"]])).toBe(`resource.data.map.id.set().hasAny(["abc","efg"])`);
    expect(RenderFields([["doc", ["map", "id"]], "hasAny", [0, 1]])).toBe(`resource.data.map.id.set().hasAny([0,1])`);
    expect(RenderFields([["doc", ["map", "id"]], "hasAny", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.set().hasAny([0,1,"abc","efg"])`);
    
    expect(RenderFields([["updateField", ["map", "id"]], "hasAny", ["abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasAny(["abc","efg"])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasAny", [0, 1]])).toBe(`request.resource.data.map.id.set().hasAny([0,1])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasAny", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasAny([0,1,"abc","efg"])`);
  });

  test("hasOnly", () => {
    expect(RenderFields([["doc", ["map", "id"]], "hasOnly", ["abc", "efg"]])).toBe(`resource.data.map.id.set().hasOnly(["abc","efg"])`);
    expect(RenderFields([["doc", ["map", "id"]], "hasOnly", [0, 1]])).toBe(`resource.data.map.id.set().hasOnly([0,1])`);
    expect(RenderFields([["doc", ["map", "id"]], "hasOnly", [0, 1, "abc", "efg"]])).toBe(`resource.data.map.id.set().hasOnly([0,1,"abc","efg"])`);
    
    expect(RenderFields([["updateField", ["map", "id"]], "hasOnly", ["abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasOnly(["abc","efg"])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasOnly", [0, 1]])).toBe(`request.resource.data.map.id.set().hasOnly([0,1])`);
    expect(RenderFields([["updateField", ["map", "id"]], "hasOnly", [0, 1, "abc", "efg"]])).toBe(`request.resource.data.map.id.set().hasOnly([0,1,"abc","efg"])`);
  });
});