ReactiveDS = {
  keys: {},
  deps: {},

  get: function (key) {
    this.ensureDeps(key);
    this.deps[key].depend();
    return this.keys[key];
  },

  set: function (key, value){
    this.ensureDeps(key);
    this.keys[key] = value;
    this.deps[key].changed();
  },

  ensureDeps: function (key){
    if (!this.deps[key])
      this.deps[key] = new Deps.Dependency;
  }

};