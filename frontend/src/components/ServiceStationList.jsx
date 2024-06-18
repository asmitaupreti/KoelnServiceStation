const ServiceStationList = ({ data }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-auto max-w-screen-lg mt-6 mb-2">
      {data.map((serviceStation, index) => (
        <div
          key={serviceStation.attributes.objectid}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
        >
          <div className="flex items-center p-4 w-full">
            <div className="bg-gray-200 rounded-full flex items-center justify-center w-12 h-12 mr-4">
              <p className="text-gray-600 text-lg font-bold">{index + 1}</p>
            </div>
            <div>
              <p className="text-lg font-medium">
                {serviceStation.attributes.adresse}
              </p>
              <p className="text-gray-700">{serviceStation.attributes.city}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ServiceStationList
