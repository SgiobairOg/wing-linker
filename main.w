bring ex;
bring cloud;
bring util;
bring http;

struct Link {
  id: str;
  url: str;
  created: num;
}

interface ILinkManager extends std.IResource {
  inflight add(url : str): str;
  inflight remove(key: str): bool;
  inflight visit(key: str):str?;
}

class LinkManager impl ILinkManager {
  db: ex.Redis;

  extern "./utils.js" static inflight incrementStringValue(string: str):str;

  init() {
    this.db = new ex.Redis();
  }

  inflight _add(key: str, value: str) {
    this.db.set(key, value);
  }

  pub inflight add(url: str): str {
    let shortCode = util.nanoid({size: 10});
    let key = "link:${shortCode}";

    this._add(key, url);
    log("Adding new URL ${url} as ${key}");

    return shortCode;
  }

  inflight _visit(shortCode: str, countryCode: str?) {
    let key = "link:${shortCode}:stats";
    let visitCount:str = this.db.hget(key, "visits") ?? "0";
    this.db.hset(key, "visits", LinkManager.incrementStringValue(visitCount));

    if countryCode? {
      let countryCount:str = this.db.hget(key, "visits:${countryCode}") ?? "0";
      this.db.hset(key, "visits:${countryCount}", LinkManager.incrementStringValue(visitCount));
    }
  }

  inflight _retrieve(shortCode: str):str? {
    let key = "link:${shortCode}";
    return this.db.get(key);
  }

  pub inflight visit(shortCode: str, countryCode: str?):str? {
    let url = this._retrieve(shortCode);

    if url? { this._visit(shortCode, countryCode); }

    return url;
  }

  pub inflight remove(shortCode: str):bool {
    // Not yet
    return false;
  }
}

class LinkService {
  pub api: cloud.Api;
  manager: ILinkManager;

  init(manager: ILinkManager) {
    this.api = new cloud.Api(cors: true);
    this.manager = manager;

    this.api.post("/add", inflight (req) => {
      if let body = req.body {
        let url = Json.parse(body).get("url").asStr();

        let key = this.manager.add(url);
        return {
          status: 201,
          body: key
        };
      } else {
        return {
          status: 400
        };
      }

    });

    this.api.get("/{key}", inflight (req): cloud.ApiResponse => {
      let key = req.vars.get("key");

      try {
        let url:str? = this.manager.visit(key);

        if let url = url {
          let headers:MutMap<str> = MutMap<str>{};
          headers.set("location", url);
          return {
            status: 301,
            headers: headers.copy()
          };
        }

        return { status: 404 };
        
      } catch {
        return {
          status: 400
        };
      }
    });
  }
}

let manager = new LinkManager();
let linkApi = new LinkService(manager);