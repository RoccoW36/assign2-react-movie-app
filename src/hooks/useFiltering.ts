import { useState } from "react";

export interface Filter<ValueType = string> {
  name: string;
  value: ValueType;
  condition: (item: any, value: ValueType) => boolean;
}

const useFiltering = <T extends Filter[]>(filters: T) => {
  const [filterValues, setFilterValues] = useState(() => {
    const filterInitialValues = filters.map((f) => ({
      name: f.name,
      value: f.value,
    }));
    return filterInitialValues;
  });

  const filteringConditions = filters.map((f) => f.condition);

  const filterFunction = (collection: any) => {
    return filteringConditions.reduce((filteredData, conditionFn, index) => {
      return filteredData.filter((item: any) => {
        return conditionFn(item, filterValues[index].value);
      });
    }, collection);
  };

  const processCollection = (collection: any, sortCondition?: (data: any[]) => any[]) => {
    const filteredCollection = filterFunction(collection);
    return sortCondition ? sortCondition(filteredCollection) : filteredCollection;
  };

  const changeFilterValues = (name: string, value: string) => {
    const updatedFilters = filterValues.map((filter) =>
      filter.name === name ? { ...filter, value } : filter
    );
    setFilterValues(updatedFilters);
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
