import { storageLoad, storageSave } from "./storage";

describe("Storage API", () => {
  describe("storageSave()", () => {
    test("Value should be saved to and loaded from", () => {
      const savedValue = "saved value";

      storageSave(savedValue);
      const loadedValue = storageLoad();

      expect(loadedValue).toBeDefined();
      expect(loadedValue).toBe(savedValue);
    });
  });
});
