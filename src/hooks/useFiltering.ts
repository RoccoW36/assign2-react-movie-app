import { useState, useMemo } from "react";

export interface Filter<ValueType = string> {
  name: string;
  value: ValueType;
  condition: (item: any, value: ValueType) => boolean;
}

const useFiltering = <T extends Filter[]>(filters: T) => {
  const [filterValues, setFilterValues] = useState(() =>
    filters.map((f) => ({
      name: f.name,
      value: f.value,
    }))
  );

  const filteringConditions = useMemo(
    () =>
      filters.map((f) => ({
        name: f.name,
        condition: f.condition,
      })),
    [filters]
  );

  const filterFunction = (collection: any[]) => {
    if (!collection || collection.length === 0) return [];
  
    return filteringConditions.reduce((filteredData, { name, condition }) => {
      const filterValue = filterValues.find((f) => f.name === name)?.value ?? ""; 
      return filteredData.filter((item) => condition(item, filterValue));
    }, collection);
  };
  

  const processCollection = (collection: any[], sortCondition?: (data: any[]) => any[]) => {
    const filteredCollection = filterFunction(collection || []);
    return sortCondition ? sortCondition(filteredCollection) : filteredCollection;
  };

  const changeFilterValues = (name: string, value: string) => {
    setFilterValues((prev) =>
      prev.map((filter) => (filter.name === name ? { ...filter, value } : filter))
    );
  };

  return {
    filterValues,
    setFilterValues,
    filterFunction,
    processCollection,
    changeFilterValues,
  };
};

export default useFiltering;
