exports.handler = async function(event) {
  return await (
              (await (async () => {
                const $Closure1Client = 
              require("./inflight.$Closure1-1.js")({
                $__parent_this_1_manager: 
          (await (async () => {
            const LinkManagerClient = 
          require("./inflight.LinkManager-1.js")({
            $util_Util: require("/Users/aoibhewilson/.asdf/installs/nodejs/19.6.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/util/util.js").Util,
          })
        ;
            const client = new LinkManagerClient({
              $this_db: (function(env) {
  let handle = process.env[env];
  if (!handle) {
    throw new Error("Missing environment variable: " + env);
  }
  return $simulator.findInstance(handle);
})("REDIS_HANDLE_9dea43ad"),
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
                $std_Json: require("/Users/aoibhewilson/.asdf/installs/nodejs/19.6.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/std/json.js").Json,
              })
            ;
                const client = new $Closure1Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            ).handle(event);
};