import localforage from "localforage";

export const CONSTANT = {
  TOKEN: 'token',
  APP_NAME: 'educat'
}

localforage.config({
  name: CONSTANT.APP_NAME,
  storeName: CONSTANT.APP_NAME,
  driver: localforage.LOCALSTORAGE,
  version: 1,
  description: 'test',
});