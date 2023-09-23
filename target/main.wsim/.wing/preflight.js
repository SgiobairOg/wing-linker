const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const ex = $stdlib.ex;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class LinkManager extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.db = this.node.root.newAbstract("@winglang/sdk.ex.Redis",this,"ex.Redis");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.LinkManager-1.js")({
            $util_Util: ${context._lift(util.Util)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const LinkManagerClient = ${LinkManager._toInflightType(this)};
            const client = new LinkManagerClient({
              $this_db: ${this._lift(this.db)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["incrementStringValue", "_add", "add", "_visit", "_retrieve", "visit", "remove", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          LinkManager._registerBindObject(this.db, host, []);
        }
        if (ops.includes("_add")) {
          LinkManager._registerBindObject(this.db, host, ["set"]);
        }
        if (ops.includes("_retrieve")) {
          LinkManager._registerBindObject(this.db, host, ["get"]);
        }
        if (ops.includes("_visit")) {
          LinkManager._registerBindObject(LinkManager, host, ["incrementStringValue"]);
          LinkManager._registerBindObject(this.db, host, ["hget", "hset"]);
        }
        if (ops.includes("add")) {
          LinkManager._registerBindObject(this, host, ["_add"]);
        }
        if (ops.includes("visit")) {
          LinkManager._registerBindObject(this, host, ["_retrieve", "_visit"]);
        }
        super._registerBind(host, ops);
      }
    }
    class LinkService extends $stdlib.std.Resource {
      constructor(scope, id, manager) {
        super(scope, id);
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api",{ cors: true });
        this.manager = manager;
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure1-1.js")({
                $__parent_this_1_manager: ${context._lift(__parent_this_1.manager)},
                $std_Json: ${context._lift(std.Json)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure1Client = ${$Closure1._toInflightType(this)};
                const client = new $Closure1Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["handle", "$inflight_init"];
          }
          _registerBind(host, ops) {
            if (ops.includes("handle")) {
              $Closure1._registerBindObject(__parent_this_1.manager, host, ["add"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.api.post("/add",new $Closure1(this,"$Closure1")));
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure2-1.js")({
                $__parent_this_2_manager: ${context._lift(__parent_this_2.manager)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure2Client = ${$Closure2._toInflightType(this)};
                const client = new $Closure2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["handle", "$inflight_init"];
          }
          _registerBind(host, ops) {
            if (ops.includes("handle")) {
              $Closure2._registerBindObject(__parent_this_2.manager, host, ["visit"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.api.get("/{key}",new $Closure2(this,"$Closure2")));
      }
      static _toInflightType(context) {
        return `
          require("./inflight.LinkService-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const LinkServiceClient = ${LinkService._toInflightType(this)};
            const client = new LinkServiceClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["$inflight_init"];
      }
    }
    const manager = new LinkManager(this,"LinkManager");
    const linkApi = new LinkService(this,"LinkService",manager);
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
