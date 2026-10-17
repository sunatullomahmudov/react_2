import { useState } from "react";
import ProductList from "./componnents/ProductList";
import SearchBar from "./componnents/SearchBar";

const App = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Users Dashboard
        </h1>

        <SearchBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus} />

        <ProductList search={search} status={status} />
      </div>
    </div>
  );
};

export default App;