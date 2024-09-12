"use client"

import { useCallback, useState } from "react";

const useToggle = (inititalValue: boolean = false) => {
  const [value, setValue] = useState(inititalValue)

  const toggle = useCallback(() => setValue((state) => !state), []);
    
  return [value, toggle] as const
}

export default useToggle