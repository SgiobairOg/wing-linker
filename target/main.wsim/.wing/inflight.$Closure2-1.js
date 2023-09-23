module.exports = function({ $__parent_this_2_manager }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const key = (req.vars)["key"];
      try {
        const url = (await $__parent_this_2_manager.visit(key));
        {
          const $if_let_value = url;
          if ($if_let_value != undefined) {
            const url = $if_let_value;
            const headers = ({});
            ((obj, args) => { obj[args[0]] = args[1]; })(headers, ["location",url]);
            return ({"status": 301,"headers": ({...(headers)})});
          }
        }
        return ({"status": 404});
      }
      catch {
        return ({"status": 400});
      }
    }
  }
  return $Closure2;
}
