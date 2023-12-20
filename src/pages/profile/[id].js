import CustomLoader from "@/components/customLoader";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

export default function Profile() {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = router.query.id;
        const response = await axios.get(`/api/v1/users/${userId}`);
        const userData = response.data.user;
        console.log(userData);

        if (userData) {
          setPageData({
            id: userData[0].id,
            firstname: userData[0].firstname,
            lastname: userData[0].lastname,
            age: userData[0].age,
            gender: userData[0].gender,
            immunization: userData[0].immunization,
          });
        }

        setPageLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setPageLoading(false);
      }
    };

    if (router.query.id) {
      fetchUserData();
    }
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      {pageLoading ? (
        <CustomLoader />
      ) : pageData != null ? (
        <div className="container p-4 rounded border mt-2">
          <div className="d-flex justify-content-between">
            <p className="h3">User Profile</p>
            <a href="/" className="btn btn-primary">
              Back to Home
            </a>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-6 mb-2">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  value={pageData.firstname}
                />
              </div>
              <div className="col-6 mb-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  value={pageData.lastname}
                />
              </div>
              <div className="col-6 mb-2">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  value={pageData.age}
                />
              </div>
              <div className="col-6 mb-2">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  value={pageData.gender}
                />
              </div>
              <div className="col-6">
                <Form.Label>Immunization</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  value={pageData.immunization}
                />
              </div>
              <div className="col-6">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  disabled
                  readOnly
                  value={pageData.id}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <p>404</p>
          <p>Entered ID does not exist</p>
        </div>
      )}
    </>
  );
}
