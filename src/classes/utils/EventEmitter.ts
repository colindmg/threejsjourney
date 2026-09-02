interface Name {
  original: string;
  value: string;
  namespace: string;
}

export class EventEmitter {
  private callbacks: any = {};

  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }

  public on(_names: string, callback: Function) {
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong names");
      return false;
    }

    if (typeof callback === "undefined") {
      console.warn("wrong callback");
      return false;
    }

    const names = this.resolveNames(_names);

    names.forEach((_name) => {
      const name = this.resolveName(_name);

      if (!(this.callbacks[name.namespace] instanceof Object))
        this.callbacks[name.namespace] = {};

      if (!(this.callbacks[name.namespace][name.value] instanceof Array))
        this.callbacks[name.namespace][name.value] = [];

      this.callbacks[name.namespace][name.value].push(callback);
    });

    return this;
  }

  public off(_names: string) {
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong name");
      return false;
    }

    const names = this.resolveNames(_names);

    names.forEach((_name) => {
      const name = this.resolveName(_name);

      if (name.namespace !== "base" && name.value === "") {
        delete this.callbacks[name.namespace];
      } else {
        if (name.namespace === "base") {
          for (const namespace in this.callbacks) {
            if (
              this.callbacks[namespace] instanceof Object &&
              this.callbacks[namespace][name.value] instanceof Array
            ) {
              delete this.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0)
                delete this.callbacks[namespace];
            }
          }
        } else if (
          this.callbacks[name.namespace] instanceof Object &&
          this.callbacks[name.namespace][name.value] instanceof Array
        ) {
          delete this.callbacks[name.namespace][name.value];

          if (Object.keys(this.callbacks[name.namespace]).length === 0)
            delete this.callbacks[name.namespace];
        }
      }
    });

    return this;
  }

  public trigger(_name: string, _args?: any[]) {
    if (typeof _name === "undefined" || _name === "") {
      console.warn("wrong name");
      return false;
    }

    let finalResult: any = null;
    let result = null;

    const args = !(_args instanceof Array) ? [] : _args;
    const nameArray = this.resolveNames(_name);
    const name = this.resolveName(nameArray[0]);

    if (name.namespace === "base") {
      for (const namespace in this.callbacks) {
        if (
          this.callbacks[namespace] instanceof Object &&
          this.callbacks[namespace][name.value] instanceof Array
        ) {
          this.callbacks[namespace][name.value].forEach(
            (callback: Function) => {
              result = callback.apply(this, args);

              if (typeof finalResult === "undefined") {
                finalResult = result;
              }
            },
          );
        }
      }
    } else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === "") {
        console.warn("wrong name");
        return this;
      }

      this.callbacks[name.namespace][name.value].forEach(
        (callback: Function) => {
          result = callback.apply(this, args);

          if (typeof finalResult === "undefined") finalResult = result;
        },
      );
    }

    return finalResult;
  }

  resolveNames(_names: string) {
    let names: string | string[] = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
    names = names.replace(/[,/]+/g, " ");
    names = names.split(" ");

    return names;
  }

  resolveName(name: string) {
    const newName: Partial<Name> = {};
    const parts = name.split(".");

    newName.original = name;
    newName.value = parts[0];
    newName.namespace = "base";

    if (parts.length > 1 && parts[1] !== "") {
      newName.namespace = parts[1];
    }

    return newName as Name;
  }
}
