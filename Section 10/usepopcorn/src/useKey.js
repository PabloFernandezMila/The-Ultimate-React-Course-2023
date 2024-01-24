import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        document.addEventListener("keydown", function (e) {
          if (e.code.toLocaleLowerCase() === key.toLocaleLowerCase()) {
            action();
          }
        });
      }

      document.addEventListener("keydown", callback);
      return function () {
        document.addEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
