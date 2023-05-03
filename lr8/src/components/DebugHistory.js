import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function DebugHistory() {
  const [historyList, setHistoryList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setHistoryList((prevList) => [...prevList, location.pathname]);
    });
    return () => {
      unlisten();
    };
  }, [history]);


  return (
    <div>
      <h2>Історія переглядів:</h2>
      <ul>
        {historyList.map((path, index) => (
          <li key={index}>{path}</li>
        ))}
      </ul>
    </div>
  );
}

export default DebugHistory;
