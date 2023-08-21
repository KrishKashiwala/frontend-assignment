export interface IAnimeComponentProps {
  animeData: {
    pagination: {
      items: {
        total: number;
      };
    };
    data: IAnime[];
  };
}

export interface IAnime {
  about: string;
  favorites: number;
  images: {
    [key: string]: {
      image_url: string;
    };
  };
  mal_id: number;
  name: string;
  nicknames: string[];
  url: string;
}
