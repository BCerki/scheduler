import { useState } from "react";

const useVisualMode = function (initialMode) {
  const [history, setHistory] = useState([initialMode]);

  //Function to change between appointment views
  const transition = function (newMode, replace = false) {
    //Replace parameter determines whether to simply add the new mode or to replace the current mode with the new one
    if (!replace) {
      //put newMode at the beginning of the array so it can be accessed with history[0] later
      setHistory((prev) => [newMode, ...prev]);
    }
    setHistory((prev) => [newMode, ...prev.slice(1)]);
  };

  //Function to go back a view
  const back = function () {
    if (history.length < 2) {
      return;
    }
    setHistory((prev) => prev.slice(1));
  };

  return { mode: history[0], transition, back };
};

export default useVisualMode;
