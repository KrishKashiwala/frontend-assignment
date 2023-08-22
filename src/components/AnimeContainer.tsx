import { IAnimeComponentProps } from "../interface";
import { Anime } from "./Anime";
import { Skeleton, message } from "antd";
import { useState, useEffect } from "react";

export const AnimeContainer: React.FC<IAnimeComponentProps> = ({
  animeData,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "No Results Found",
    });
  };
  useEffect(() => {
    if (animeData.data.length > 0) {
      setIsLoading(false);
    } else {
      warning();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animeData]);

  return (
    <div>
      {contextHolder}
      {isLoading ? (
        <div style={{ marginTop: "2vw" }}>
          {Array(15)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} active />
            ))}
        </div>
      ) : (
        <div>
          {animeData.data.map((anime, index) => (
            <Anime key={index} {...anime} />
          ))}
          {animeData.data.length === 0 && (
            <>
              <div style={{ marginTop: "2vw" }}>No results found</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
