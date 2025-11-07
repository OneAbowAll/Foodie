
export function Header({ onSearch, onSortChange } : { onSearch: (search: string) => void, onSortChange: (sortType: string)=>void })
{
    return (
        <div className="container header">
          <input type="text" placeholder="Search recipe..."></input>

          <select name="sort">
            <option value="latest">Latest</option>
            <option value="likes">Likes</option>
          </select>
        </div>
    );
}