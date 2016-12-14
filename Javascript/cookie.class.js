/*
Cookie class: manages browser cookies using the new class available in EC2015

How to use with example:
var cookie = new Cookie("hello", "world"); => creates new cookie with name "hello" and value "world"
cookie.get(); => "world"
cookie.setVal("foo");
cookie.get(); => "foo"
--close brwoser, reload page, etc.
var cookie = new Cookie("hello");
cookie.get(); => "foo"
cookie.clear();
cookie.get(); => undefined

args:
@name: cookie name
@value: cookie value
@exdays: expiration days
@path: path in current website to be available, if "/" then available across whole site.
*/
class Cookie {
  constructor(name, value, exdays, path) {
    this.name = name;
    this.value = value ? escape(value) : "";
    this.exdays = exdays ? exdays : 1;
    this.path = path ? "/" + path + "/" : "/";
    if (this.value !== "") {
      this.set();
    }
  }
  getName() {
    return this.name;
  }
  getVal() {
    return this.value;
  }
  setVal(value) {
    this.value = escape(value);
    this.set();
  }
  set() {
    let exdate = new Date();
    exdate.setTime(exdate.getTime() + (this.exdays*24*60*60*1000)); // to set for days
    let c_value = this.value + ((this.exdays == null) ?
    "" :
    "; expires=" + exdate.toUTCString()) + "; path=" + this.path;
    document.cookie = this.name + "=" + c_value;
  }
  get() {
    let i, x, y;
    let ARRcookies = document.cookie.split(";");

    for (i = 0; i < ARRcookies.length; i++) {
      x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
      y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
      x = x.replace(/^\s+|\s+$/g, "");
      if (x == this.name) {
        this.value = y;
        return this.getVal();
      }
    }
  }
  clear() {
    this.value = "";
    this.exdays = 0;
    this.set();
  }
}
