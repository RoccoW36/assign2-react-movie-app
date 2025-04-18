import { useEffect, useState } from 'react';
import { getTVShow } from '../api/tmdb-api'; 
import { TVShowDetailsProps } from '../types/interfaces';

type TVShowHookReturnType = [TVShowDetailsProps | undefined, React.Dispatch<React.SetStateAction<TVShowDetailsProps | undefined>>];

const useTVShow = (id: string): TVShowHookReturnType => {
    const [tvShow, setTVShow] = useState<TVShowDetailsProps>();

    useEffect(() => {
        getTVShow(id).then(tvShow => {
            setTVShow(tvShow);
        });
    }, [id]);

    return [tvShow, setTVShow];
};

export default useTVShow;
