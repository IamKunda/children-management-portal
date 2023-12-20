import CustomLoader from "@/components/customLoader";
import { useState } from "react";
import { Axios } from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "male",
    immunization: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, immunization: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers your API endpoint requires
      },
      body: JSON.stringify(formData), // Convert data to JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the data from the API response
        console.log("Response:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the request:", error);
      });

    setTimeout(() => {
      setLoading(false);
    }, 3000);
    window.location.replace("/");
    // setLoading(false);
  };
  return loading ? (
    <CustomLoader />
  ) : (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                name="age"
                value={formData.age}
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
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="immunization" className="form-label">
                Immunization
              </label>
              <select
                className="form-select"
                id="immunization"
                name="immunization"
                value={formData.immunization}
                onChange={handleSelectChange}
                required
                multiple
              >
                {[
                  { value: "BCG", label: "BCG" },
                  { value: "MMR", label: "MMR" },
                  { value: "RV", label: "RV" },
                  { value: "DTap", label: "DTap" },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
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
