import React, { useState, useEffect } from "react";

interface Item {
  id: number;
  text: string;
}

// Mock API call to fetch items (no hasMore returned)
const fetchItems = (page: number, limit = 10): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (page > 5) {
        resolve([]); // No more items
      } else {
        const items = Array.from({ length: limit }, (_, idx) => ({
          id: page * limit + idx + 1,
          text: `Item #${page * limit + idx + 1}`,
        }));
        resolve(items);
      }
    }, 1000);
  });
};

export default function App() {

  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    fetchItems(page).then((newItems: Item[]) => {
      if (newItems.length === 0) {
        setHasMore(false); // No more items
      } else {
        setItems((curr) => [...curr, ...newItems]);
        setPage((curr) => curr + 1);
      }
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

