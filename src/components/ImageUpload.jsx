import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const ImageUpload = ({ onImageUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isValidType = file.type === "image/jpeg" || file.type === "image/png";
    if (!isValidType) {
      setError("Please upload a JPG or PNG image.");
      setPreviewImage(null);
      return;
    }

    setError("");
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    uploadImage(file);
  };

  const uploadImage = async (file) => {
    const fileRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
    setLoading(true);
    setError("");

    try {
      const uploadTask = uploadBytesResumable(fileRef, file);
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (err) => {
            console.error("Upload failed:", err);
            setError("Image upload failed. Please try again.");
            setLoading(false);
            reject(err);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            onImageUpload(downloadURL); // Send URL to parent
            setLoading(false);
            resolve();
          }
        );
      });
    } catch (err) {
      console.error("Upload error:", err);
      setError("An error occurred during the upload.");
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        className="w-full px-3 py-2 border rounded-md"
        disabled={loading}
      />
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="mt-3 w-20 h-20 rounded-full object-cover"
        />
      )}
      {loading && <p className="text-sm text-gray-500">Uploading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;

