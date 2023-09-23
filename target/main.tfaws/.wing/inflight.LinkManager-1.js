module.exports = function({ $util_Util }) {
  class LinkManager {
    constructor({ $this_db }) {
      this.$this_db = $this_db;
    }
    static async incrementStringValue(string) {
      return (require("/Users/aoibhewilson/Workbench/wing-linker/./utils.js")["incrementStringValue"])(string)
    }
    async _add(key, value) {
      (await this.$this_db.set(key,value));
    }
    async add(url) {
      const shortCode = (await $util_Util.nanoid(({"size": 10})));
      const key = String.raw({ raw: ["link:", ""] }, shortCode);
      (await this._add(key,url));
      {console.log(String.raw({ raw: ["Adding new URL ", " as ", ""] }, url, key))};
      return shortCode;
    }
    async _visit(shortCode, countryCode) {
      const key = String.raw({ raw: ["link:", ":stats"] }, shortCode);
      const visitCount = ((await this.$this_db.hget(key,"visits")) ?? "0");
      (await this.$this_db.hset(key,"visits",(await LinkManager.incrementStringValue(visitCount))));
      if (((countryCode) != null)) {
        const countryCount = ((await this.$this_db.hget(key,String.raw({ raw: ["visits:", ""] }, countryCode))) ?? "0");
        (await this.$this_db.hset(key,String.raw({ raw: ["visits:", ""] }, countryCount),(await LinkManager.incrementStringValue(visitCount))));
      }
    }
    async _retrieve(shortCode) {
      const key = String.raw({ raw: ["link:", ""] }, shortCode);
      return (await this.$this_db.get(key));
    }
    async visit(shortCode, countryCode) {
      const url = (await this._retrieve(shortCode));
      if (((url) != null)) {
        (await this._visit(shortCode,countryCode));
      }
      return url;
    }
    async remove(shortCode) {
      return false;
    }
  }
  return LinkManager;
}
