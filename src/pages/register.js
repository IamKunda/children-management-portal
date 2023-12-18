import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
export default function Register() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
    gender: "",
    immunization: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({ ...formData, [name]: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Here you can perform form submission logic
    console.log(formData); // For demonstration, logging the form data
    const dataAsString = JSON.stringify(formData);
    const existingData = JSON.parse(localStorage.getItem("children"));
    if (existingData != null || existingData != undefined) {
      console.log(existingData);
      existingData.push(formData);
      localStorage.setItem("children", JSON.stringify(existingData));
    } else {
      const emptyArray = [];
      emptyArray.push(formData);
      formData.FirstName = "";
      formData.Age = "";
      formData.LastName = "";

      localStorage.setItem("children", JSON.stringify(emptyArray));
    }
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    window.location.reload();
  };
  return loading ? (
    <div
      className="d-flex  justify-conteny-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="FirstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="FirstName"
                name="FirstName"
                value={formData.FirstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="LastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="LastName"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Age" className="form-label">
                Age
              </label>
              <input
                type="Age"
                className="form-control"
                id="Age"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="immunization" className="form-label">
                Immunization
              </label>
              <select
                multiple
                className="form-select"
                id="immunization"
                name="immunization"
                value={formData.immunization}
                onChange={handleSelectChange}
                required
              >
                <option value="bCG">BCG</option>
                <option value="MMR">MMR</option>
                <option value="RV">RV</option>
                <option value="DTap">DTap</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
