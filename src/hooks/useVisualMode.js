import React, { useState } from "react";

const useVisualMode = function (initialMode) {
  const [history, setHistory] = useState([initialMode]);


  const transition = function (newMode, replace = false) {
    //if replace is false, just add the newMode
    if (!replace) {
      setHistory(prev => [newMode, ...prev])
    }
    //if replace is true, replace the current mode with the new mode
    setHistory(prev => [newMode, ...prev.slice(1)])
    // console.log('history in transition', history)


  }

  const back = function () {
    if (history.length < 2) {
      return;
    }
    setHistory(prev => prev.slice(1))
    // console.log('history in back', history)

  }

  return { mode: history[0], transition, back };

}

export default useVisualMode;
