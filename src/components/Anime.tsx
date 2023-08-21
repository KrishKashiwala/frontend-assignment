import { IAnime } from "../interface";
import "../css/anime.css";
export const Anime: React.FC<IAnime> = (anime: IAnime) => {
  return (
    <div className="anime-row">
      <div className="anime-image">
        <img src={anime.images.webp.image_url} alt={anime.name} />
      </div>
      <div className="anime-content">
        <h3>{anime.name}</h3>
        <div className="label-container">
          {anime.nicknames.map((nickname) => (
            <div className="label">{nickname}</div>
          ))}
        </div>
      </div>
      <div className="anime-favorite">
        <i
          className="fa-solid fa-heart"
          style={{
            color: "red",
          }}
        ></i>
        <div>{anime.favorites}</div>
      </div>
      <div className="anime-arrow">
        <a href={anime.url} target="blank">
          <i
            className="fa-solid fa-arrow-right"
            style={{
              color: "black",
            }}
          ></i>
        </a>
      </div>
    </div>
  );
};
