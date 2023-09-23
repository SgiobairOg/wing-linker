module.exports = function({ $__parent_this_1_manager, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      {
        const $if_let_value = req.body;
        if ($if_let_value != undefined) {
          const body = $if_let_value;
          const url = ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((JSON.parse(body)), "url"));
          const key = (await $__parent_this_1_manager.add(url));
          return ({"status": 201,"body": key});
        }
        else {
          return ({"status": 400});
        }
      }
    }
  }
  return $Closure1;
}
