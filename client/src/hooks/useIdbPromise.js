import { useState, useEffect } from "react";
import { idbPromise } from "../utils/helpers";

export const useIdbPromise = (table, method, params) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await idbPromise(table, method, params);
        let item;
        if (response.length > 0) {
          item = response[0];
        } 
        setData(item);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [table, method, params]);

  return { data, loading, error };
};
