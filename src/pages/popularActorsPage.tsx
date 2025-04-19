import React, { useEffect } from "react"; 
import { useQuery } from "react-query"; 
import { getPopularActors } from "../api/tmdb-api"; 
import PageTemplate from "../components/templateActorListPage"; 
import Spinner from "../components/spinner"; 
import Alert from "@mui/material/Alert"; 
import AddToActorFavouritesIcon from "../components/cardIcons/addToActorFavourites"; 
import FloatingFilterActorsMenu from "../components/actorFilterUI"; 
import PaginationUI from "../components/PaginationUI"; 
import { DiscoverActors, BaseActorProps } from "../types/interfaces"; 
import { usePagination } from "../hooks/usePagination"; 
import useFiltering from "../hooks/useFiltering"; 

const nameFiltering = {
  name: "name",
  value: "",
  condition: (actor: BaseActorProps, value: string): boolean =>
    actor.name.toLowerCase().includes(value.toLowerCase()),
};

const genderFiltering = {
  name: "gender",
  value: "0",
  condition: (actor: BaseActorProps, value: string): boolean =>
    value === "0" || actor.gender?.toString() === value,
};

const PopularActorsPage: React.FC = () => {
  const { page, handlePageChange, totalPages, updateTotalPages } = usePagination({
    initialPage: 1,
    initialTotalPages: 1,
  });

  const { data, error, isLoading, isError } = useQuery<DiscoverActors, Error>(
    ["popularActors", page],
    () => getPopularActors(page),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        updateTotalPages(Math.min(data.total_pages, 500));
      },
    }
  );

  const actors = data?.results || [];
  const { filterValues, setFilterValues, filterFunction } = useFiltering([nameFiltering, genderFiltering]);

  useEffect(() => {
    const favourites = actors.filter((actor: BaseActorProps) => actor.favourite);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [actors]);

  if (isLoading) return <Spinner />;
  if (isError) return <Alert severity="error">Failed to load actors: {error.message}</Alert>;

  const changeFilterValues = (type: "name" | "gender", value: string | number) => {
    const changedFilter = { name: type, value: value.toString() };
    setFilterValues(
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter]
    );
  };

  const displayedActors = filterFunction(actors);

  const onBack = () => {
    if (page > 1) {
      handlePageChange({} as React.ChangeEvent<unknown>, page - 1);
    }
  };

  const onForward = () => {
    if (page < totalPages) {
      handlePageChange({} as React.ChangeEvent<unknown>, page + 1);
    }
  };

  return (
    <>
      <PageTemplate
        title="Discover Actors"
        actors={displayedActors}
        action={(actor: BaseActorProps) => (
          <AddToActorFavouritesIcon actor={actor} />
        )}
        onBack={onBack}
        onForward={onForward}
      />
      <PaginationUI
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
      <FloatingFilterActorsMenu
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genderFilter={Number(filterValues[1].value)}
      />
    </>
  );
};

export default PopularActorsPage;
