import React, { useState, useEffect } from 'react';

const useRequest = (method, dependencies = [], defaultValue) => {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const result = await method();
      setData(result.data || result.data === 0 ? result.data : result);
      setIsLoading(false);
    } catch(e) {
      console.log('接口错误: ',e);
      setIsError(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, dependencies)

  return [data, isLoading, isError];
}

export default useRequest;