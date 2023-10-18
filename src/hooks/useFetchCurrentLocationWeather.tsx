import {useState, useEffect} from 'react';
import {API_KEY, baseURL} from '../common/constants';

const useFetchCurrentLocationWeather = (viewLocation: any) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${baseURL}weather?lat=${viewLocation['coords']['latitude']}&lon=${viewLocation['coords']['longitude']}&appid=${API_KEY}`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewLocation]);

  return {data, loading, error};
};

export default useFetchCurrentLocationWeather;
