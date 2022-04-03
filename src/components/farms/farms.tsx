import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Farms() {
  const [AvailableFarms, setAvailableFarms] = useState<Array<string>>(['']);
  useEffect(() => {
    const isMounted = true;
    if (isMounted == true) {
      const fetchFarms = async () => {
        const getFarmsBatch = await axios.get(`https://bafybeigogwwmiyuahrfw2qbclpoiausrgbb5ju2jsmx5p7i6wmynvmden4.ipfs.dweb.link/`)
          .then((response) => {
          const FarmBatch = response.data;
	  setAvailableFarms(FarmBatch);
	  })
	  .catch(() => {
            console.log('failed to get farms');
          })
      }
      fetchFarms();
    }
  }, [])
  return (
    <div>
    </div>
  )
}

