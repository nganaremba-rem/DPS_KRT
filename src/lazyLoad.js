import { lazy } from "react";

export const lazyLoad = (path, namedComponent) => {
  return lazy(() => {
    const promise = import(path);
    if (namedComponent === null) return promise;
    return promise.then((module) => ({ default: module[namedComponent] }));
  });
};
