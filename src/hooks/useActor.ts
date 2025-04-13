import { useEffect, useState } from "react";
import { getActor } from '../api/tmdb-api';
import { ActorDetailsProps } from '../types/interfaces';

type ActorHookReturnType = [ActorDetailsProps | undefined, React.Dispatch<React.SetStateAction<ActorDetailsProps | undefined>>];

const useActor = (id: string): ActorHookReturnType => {
    const [actor, setActor] = useState<ActorDetailsProps>();
    
    useEffect(() => {
        getActor(id).then(actorData => {
            setActor(actorData);
        });
    }, [id]);

    return [actor, setActor];
};

export default useActor;
