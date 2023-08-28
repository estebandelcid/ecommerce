import React from "react";

// export type CategoryDataProps = {
//   id: number,
//   name: string,
//   image: string,
// }

export interface DataProps {
  id: string
  title: string
  price: number
  description: string
  images: [string] | string
  category: string 
}

const useFetch = (apiUrl: string) => {
  const [data, setData] = React.useState(null);
  

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl);
        const dataRes: Array<DataProps> = await res.json();
        setData(dataRes);
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    };
    fetchData();
  }, [apiUrl]);

  return data;
};

export default useFetch;

