const ServiceStationList = ({ data }) => {
  return (
    <div>
      {data.map((serviceStation) => (
        <div key={serviceStation.attributes.objectid} className="mb-2">
          <p>{serviceStation.attributes.adresse}</p>
        </div>
      ))}
    </div>
  )
}

export default ServiceStationList
