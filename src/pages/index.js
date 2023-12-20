import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import CustomLoader from "@/components/customLoader";
import axios from "axios";

export default function Home() {
  const [pageLoading, setpageLoading] = useState(true);
  const [pageData, setPageData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [dataEmpty, setDataEmpty] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("Start Effect Method");

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/users");
        console.log(`response.data:`, response.data.users);

        const formattedUsers = response.data.users.map((user) => ({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          age: user.age,
          gender: user.gender,
          immunization: user.immunization,
        }));

        setPageData([...formattedUsers]);
        setfilteredData([...formattedUsers]);
        setpageLoading(false);

        if (formattedUsers.length > 0) {
          setDataEmpty(false);
        }
      } catch (error) {
        console.error(`Error:`, error);
        setpageLoading(false);
      }
    };

    fetchData();

    setTimeout(() => {
      setpageLoading(false);
    }, 4000);
  }, []);
  //
  function handleSearch(e) {
    setSearchTerm(e.target.value);
    if (!searchTerm) {
      setfilteredData([...pageData]);
    } else {
      const filteredResults = pageData.filter((item) =>
        item.firstname.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setfilteredData(filteredResults);
    }
  }
  function sortByAge() {
    console.log("Start");

    const isSortedAscending = isSortedByAge();

    if (isSortedAscending) {
      const sortedData = [...filteredData].sort((a, b) => b.age - a.age);
      setfilteredData(sortedData);
    } else {
      const sortedData = [...filteredData].sort((a, b) => a.age - b.age);
      setfilteredData(sortedData);
    }
  }

  function isSortedByAge() {
    for (let i = 1; i < filteredData.length; i++) {
      if (filteredData[i - 1].age > filteredData[i].age) {
        return false; // Not sorted in ascending order
      }
    }
    return true; // Sorted in ascending order
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Created by Kunda Sakala" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {pageLoading ? (
        <CustomLoader />
      ) : dataEmpty ? (
        <div
          className="justify-content-center align-items-center d-flex"
          style={{ height: "100vh" }}
        >
          <div className="text-center">
            <p>No Records have been added yet</p>
            <a href="/register" className="btn btn-primary">
              Add
            </a>
          </div>
        </div>
      ) : (
        <div className="container rounded  p-2 mt-3">
          <div className="d-flex justify-content-between mb-2">
            <p>Children Count {filteredData.length}</p>
            <div>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <a href="/register" className="btn btn-primary ms-1">
                Add
              </a>
            </div>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>
                  Age{" "}
                  <span>
                    <i
                      className="bi bi-sort-numeric-down btn border"
                      onClick={sortByAge}
                    ></i>
                  </span>
                </th>
                <th>Gender</th>
                <th>Immunizations</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <a href={`/profile/${item.id}`}>{item.id}</a>
                  </td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.immunization}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}
