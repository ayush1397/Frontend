import React, { useState, useEffect } from "react";

interface Item {
  id: number;
  text: string;
}

interface FetchResponse {
  items: Item[];
  hasMore: boolean;
}

const fetchItems = (page: number, limit = 10): Promise<FetchResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (page > 5) {
        resolve({ items: [], hasMore: false });
      } else {
        const items = Array.from({ length: limit }, (_, idx) => ({
          id: page * limit + idx + 1,
          text: `Item #${page * limit + idx + 1}`
        }));
        resolve({ items, hasMore: true });
      }
    }, 1000);
  });
};

const App = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    fetchItems(page).then((res: FetchResponse) => {
      setItems((prev) => [...prev, ...res.items]);
      setHasMore(res.hasMore);
      if (res.hasMore) setPage((prev) => prev + 1);
    });
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100;

      if (nearBottom && hasMore) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, page]);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Infinite Scroll (Minimal)</h2>
      {items.map((item) => (
        <div
          key={item.id}
          style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
        >
          {item.text}
        </div>
      ))}
      {!hasMore && (
        <div style={{ padding: "10px", textAlign: "center" }}>
          🎉 No more items to load
        </div>
      )}
    </div>
  );
};

export default App;
