import { AnimeContainer } from "./components/AnimeContainer";
import { useEffect, useState } from "react";
import { IAnimeComponentProps } from "./interface";
import Search from "antd/es/input/Search";
import debounce from "lodash/debounce";
import { Pagination } from "antd";

const App = () => {
  const BASE_URL = "https://api.jikan.moe/v4/characters";

  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  // eslint-disable-next-line
  const [currentLimit, setCurrentLimit] = useState<number>(15);
  const [animeData, setAnimeData] = useState<IAnimeComponentProps>({
    animeData: {
      data: [],
      pagination: {
        items: {
          total: 0,
        },
      },
    },
  });

  useEffect(() => {
    fetchAnimeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLimit, currentPage, query]);

  // Debounce the handleSearch function
  const debouncedHandleSearch = debounce((value: string) => {
    setQuery(value);
    setCurrentPage(1);
    fetchAnimeData();
  }, 300);

  const fetchAnimeData = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}?q=${query}&page=${currentPage}&limit=${currentLimit}&order_by=favorites&sort=desc`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAnimeData({ animeData: data });
      setCurrentTotal(data.pagination.items.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search when the input value changes
  const handleSearchChange = (value: string) => {
    // Call the debounced function
    debouncedHandleSearch(value);
  };

  return (
    <div className="main-container">
      <h1>Search Anime Characters</h1>
      <div style={{ marginBottom: "2em" }}>
        <span>Total {currentTotal} matching anime characters found.</span>
      </div>
      <Search
        placeholder="Search Anime Characters"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleSearchChange(e.target.value);
        }}
      ></Search>
      <AnimeContainer animeData={animeData.animeData} />
      <Pagination
        current={currentPage}
        total={currentTotal}
        pageSize={currentLimit}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{
          marginTop: "2em",
        }}
      />
    </div>
  );
};

export default App;
