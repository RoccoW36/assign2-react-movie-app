import { useState } from "react";

interface Filter {
    name: string;
    value: string;
    condition: (item: any, value: string) => boolean;
    }

const useFiltering = ( filters: Filter[]) => {
  const [filterValues, setFilterValues] = useState(() => {
    const filterInitialValues = filters.map((f) => ({
      name: f.name,
      value: f.value,
    }));
    return filterInitialValues;
  });

  const filteringConditions = filters.map((f) => f.condition);
  const filterFunction = (collection: any) =>{
    console.log("collection):", collection); 
    console.log("filtering conditions):", filteringConditions); 
    return filteringConditions.reduce((data, conditionFn, index) => {

      return data.filter((item: any) => {
        console.log("item):", item);
        console.log("index):", filterValues[index].value);
          return conditionFn(item, filterValues[index].value);
      });
    }, collection);
  }
  return {
    filterValues,
    setFilterValues,
    filterFunction,
  };
};

export default useFiltering;
