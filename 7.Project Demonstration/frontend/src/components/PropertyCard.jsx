import API from '../services/api';

const PropertyCard = ({ property }) => {
  const imageUrl =
    property.images && property.images.length > 0
      ? `http://localhost:5000/uploads/${property.images[0]}`
      : null;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-lg">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="property"
            style={{ height: '200px', objectFit: 'cover' }}
            className="card-img-top"
          />
        )}

        <div className="card-body">
          <h6>{property.address}</h6>
          <p>{property.propertyType} - {property.adType}</p>
          <p>Contact: {property.ownerContact}</p>
          <p className="fw-bold">₹{property.amount}</p>

          <button
            className="btn btn-primary w-100"
            onClick={() =>
              API.post('/bookings', { propertyId: property._id })
            }
          >
            Request Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;