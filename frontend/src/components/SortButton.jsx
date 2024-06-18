const SortButton = ({ label, onClick }) => {
  return (
    <button className="bg-white p-2" onClick={onClick}>
      {label}
    </button>
  )
}

export default SortButton
