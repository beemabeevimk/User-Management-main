/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import authAxios from "../../redux/features/api/authApi";
// import imageUrl from "..profile-img.jpg"
import image from "../../assets/profile-img.jpg";
import { imageUpload, me } from "../../utils/constants";

const Profile = () => {
  const state = useSelector((state) => state);
  const access = state.user?.data?.access;
  const decode = access && jwt_decode(access);
  console.log(decode);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const userId = decode?.user_id;
  console.log("Userid", userId);

  useEffect(() => {
    async function fetchUserDetails() {
      console.log("access",access);
      try {
        const response = await authAxios.get(me,{
          headers: { 
            "Authorization": `Bearer ${access}`,
            "Content-Type": "application/json"
          },
        });
        console.log("profile", response);
        setImageUrl(response.data?.image)
      } catch (error) {}
    }

    fetchUserDetails();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const file = selectedFile;
      // const authTokens = JSON.parse(localStorage.getItem('authTokens'));
      console.log(`Access: ${access}`);

      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await authAxios.put(imageUpload, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${access}`,
          },
        });

        setImageUrl(response.data?.image);
        console.log("Image edited successfully:", response.data);
      } catch (error) {
        console.log("Error editing image:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="w-full max-w-sm bg-white border border-gray-200">
        <div className="flex justify-end px-4 pt-4 relative"></div>
        <div className="flex flex-col items-center pb-10 ">
          {/* <img src={ `http://127.0.0.1:8000${image}`} className="card-img-top" alt="profile"></img> */}
          <img
            className="w-32 h-32 mb-3 rounded-full shadow-lg"
            src={`http://127.0.0.1:8000${imageUrl}`}
            alt=""
          />

          <div className="flex mt-4 space-x-3 md:mt-2">
            <form
              onSubmit={handleSubmit}
              style={{ width: "20rem" }}
              className="mt-3"
            >
              <input
                className="inline-flex items-center px-2 py-2 text-sm font-medium text-center  dark:text-black"
                type="file"
                onChange={handleFileChange}
              />
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center  dark:text-black"
                type="submit"
              >
                Upload
              </button>
            </form>
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {decode?.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {decode?.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
