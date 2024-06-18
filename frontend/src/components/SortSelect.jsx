const SortSelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border-2 border-blue-500 rounded-md px-4 py-2 text-sm text-gray-800 shadow-md focus:outline-none focus:ring focus:border-blue-500"
    >
      <option value="">Sort</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  )
}

export default SortSelect
