const SearchInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-2 w-2/3 lg:w-1/3 border-blue-500 px-4 py-2 rounded-md text-sm text-gray-800 shadow-md focus:outline-none focus:ring focus:border-blue-500"
    />
  )
}

export default SearchInput
