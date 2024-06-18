const SearchInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-2 border-blue-500 p-2 w-1/3"
    />
  )
}

export default SearchInput
