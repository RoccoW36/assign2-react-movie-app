import { ActorDetailsProps } from "../types/interfaces";

const sampleActorDataZendaya: ActorDetailsProps = {
  id: 505710,
  name: "Zendaya",
  profile_path: "/lS9cGBflBYB6VkzMdFC4nygLVCX.jpg",
  popularity: 90.123,
  known_for_department: "Acting",
  gender: 1,
  biography: `Zendaya Maree Stoermer Coleman is an American actress and singer. 
She began her career as a child model and backup dancer, and gained prominence 
for her role as Rocky Blue on the Disney Channel sitcom Shake It Up (2010–2013). 
She went on to star in Euphoria and the Spider-Man MCU films.`,
  birthday: "1996-09-01",
  place_of_birth: "Oakland, California, USA",
  known_for: [
    {
      id: 634649,
      title: "Spider-Man: No Way Home",
      media_type: "movie"
    },
    {
      id: 438631,
      title: "Dune",
      media_type: "movie"
    },
    {
      id: 567189,
      title: "Euphoria",
      media_type: "tv"
    }
  ]
};

export default sampleActorDataZendaya;
