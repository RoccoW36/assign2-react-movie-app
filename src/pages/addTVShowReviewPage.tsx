import React from "react";
import PageTemplate from "../components/templateTVShowPage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { TVShowDetailsProps } from "../types/interfaces";

const WriteTVShowReviewPage: React.FC = () => {
    const location = useLocation()
    const { tvShowId } = location.state;
    const { data: tvShow, error, isLoading, isError } = useQuery<TVShowDetailsProps, Error>(
        ["TV Show", tvShowId],
        () => getTVShow(tvShowId)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {tvShow ? (
                    <PageTemplate tvShow={tvShow}>
                        <ReviewForm {...tvShow} />
                    </PageTemplate>
            ) : (
                <p>Waiting for TV Show review details</p>
            )}
        </>
    );
};

export default WriteTVShowReviewPage;
