import { useEffect, useState } from 'react';

export function useLogger(state, name) {
  useEffect(() => {
    console.log(`${name} state:`, state);
  }, [state, name]);
};


export function useStatus(initialStatus){
  const [status, setStatus] = useState(initialStatus);

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
  };

  return [status, updateStatus];
}

export function useToggle(initialValue = false){
  const [value, setValue] = useState(initialValue);
  const toggleValue = () => setValue(!value);
  return [value, toggleValue];
}
