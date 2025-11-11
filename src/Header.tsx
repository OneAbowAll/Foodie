import { useRef } from "react";

export function Header({ onSearch, onSortChange } : { onSearch: (search: string) => void, onSortChange: (sortType: string)=>void })
{
  const searchInput = useRef<HTMLInputElement>(null);
  const sortSelect = useRef<HTMLSelectElement>(null);

  const handleSearch = () =>
  {
    onSearch(searchInput.current!.value.trim());
  };
  
  const handleSortChange = ()=>
  {
    onSortChange(sortSelect.current!.value);
  };

  return (
    <div className="container header">
      <h2>Foodie</h2>
      <input type="text" ref={searchInput} onChange={handleSearch} placeholder="Search recipe..."></input>

      <select name="sort" ref={sortSelect} onChange={handleSortChange}>
        <option value="latest">Latest</option>
        <option value="likes">Likes</option>
      </select>
    </div>
  );
}