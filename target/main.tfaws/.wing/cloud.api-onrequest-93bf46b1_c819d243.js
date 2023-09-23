exports.handler = async function(event) {
  return await (new (require("/Users/aoibhewilson/.asdf/installs/nodejs/19.6.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/shared-aws/api.onrequest.inflight.js")).ApiOnRequestHandlerClient({ handler: 
              (await (async () => {
                const $Closure2Client = 
              require("./inflight.$Closure2-1.js")({
                $__parent_this_2_manager: 
          (await (async () => {
            const LinkManagerClient = 
          require("./inflight.LinkManager-1.js")({
            $util_Util: require("/Users/aoibhewilson/.asdf/installs/nodejs/19.6.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/util/util.js").Util,
          })
        ;
            const client = new LinkManagerClient({
              $this_db: new (require("/Users/aoibhewilson/.asdf/installs/nodejs/19.6.0/lib/node_modules/winglang/node_modules/@winglang/sdk/lib/target-tf-aws/redis.inflight")).RedisClient(process.env["REDIS_CLUSTER_ID_55db844d"]),
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        ,
              })
            ;
                const client = new $Closure2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            , args: {"corsHeaders":{"Access-Control-Allow-Origin":"*","Access-Control-Expose-Headers":"","Access-Control-Allow-Credentials":"false"}} })).handle(event);
};