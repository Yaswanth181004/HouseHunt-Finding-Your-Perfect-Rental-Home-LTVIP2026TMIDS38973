import { useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../services/api';

const AddProperty = () => {
  const [propertyType, setPropertyType] = useState('');
  const [adType, setAdType] = useState('');
  const [address, setAddress] = useState('');
  const [ownerContact, setOwnerContact] = useState('');
  const [amount, setAmount] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async () => {
    if (
      !propertyType ||
      !adType ||
      !address ||
      !ownerContact ||
      !amount ||
      images.length === 0
    ) {
      alert('All fields including images are required');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user'));

      const formData = new FormData();
      formData.append('propertyType', propertyType);
      formData.append('adType', adType);
      formData.append('address', address);
      formData.append('ownerContact', ownerContact);
      formData.append('amount', amount);
      formData.append('additionalInfo', additionalInfo);

      images.forEach((img) => {
        formData.append('images', img);
      });

      await API.post('/owner/add-property', formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Property added successfully');

      // Reset form
      setPropertyType('');
      setAdType('');
      setAddress('');
      setOwnerContact('');
      setAmount('');
      setAdditionalInfo('');
      setImages([]);

    } catch (error) {
      console.error(error);
      alert('Failed to submit property');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="card p-4">
          <h5 className="text-primary mb-4">Add New Property</h5>

          {/* PROPERTY TYPE */}
          <select
            className="form-control mb-3"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Select Property Type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>

          {/* AD TYPE */}
          <select
            className="form-control mb-3"
            value={adType}
            onChange={(e) => setAdType(e.target.value)}
          >
            <option value="">Select Ad Type</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>

          <input
            className="form-control mb-3"
            placeholder="Full Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Owner Contact"
            value={ownerContact}
            onChange={(e) => setOwnerContact(e.target.value)}
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Additional Information"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />

          <input
            type="file"
            multiple
            accept="image/*"
            className="form-control mb-4"
            onChange={(e) => setImages([...e.target.files])}
          />

          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit Property
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProperty;