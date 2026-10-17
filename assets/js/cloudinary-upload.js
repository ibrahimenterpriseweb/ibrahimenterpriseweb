/**
 * IBRAHIM ENTERPRISE - CLOUDINARY DIRECT CLIENT-SIDE UPLOADER
 * Uses the secure Unsigned Upload Preset 'Ibrahim Enterprise' on cloud 'dun5uome'.
 * Direct client uploads without exposing the Cloudinary API secret.
 */

(function () {
  'use strict';

  const CLOUDINARY_ENDPOINT = "https://api.cloudinary.com/v1_1/dun5uome/image/upload";
  const UPLOAD_PRESET = "Ibrahim Enterprise";
  const MAX_FILE_SIZE_BYTES = 12 * 1024 * 1024; // 12 MB max

  const ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif'
  ];

  /**
   * Uploads an image file directly to Cloudinary
   * @param {File|Blob} file - The file to upload
   * @param {Object} options - Optional callbacks & configurations
   * @param {Function} [options.onProgress] - Callback (percent: number)
   * @returns {Promise<Object>} Resolves with Cloudinary payload { secure_url, public_id, ... }
   */
  async function uploadToCloudinary(file, options = {}) {
    if (!file) {
      throw new Error("No file provided for upload.");
    }

    // 1. Client-side MIME validation
    if (file.type && !ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      throw new Error(`Unsupported image format (${file.type}). Please select a JPG, PNG, WEBP, or SVG image.`);
    }

    // 2. Client-side File size limit
    if (file.size && file.size > MAX_FILE_SIZE_BYTES) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      throw new Error(`Image size is too large (${sizeMb} MB). Maximum allowed size is 12 MB.`);
    }

    // 3. Build Form Data with Unsigned Preset
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", CLOUDINARY_ENDPOINT);

      // Track upload progress
      if (xhr.upload && typeof options.onProgress === 'function') {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            options.onProgress(percentComplete);
          }
        };
      }

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              url: response.url,
              secure_url: response.secure_url,
              public_id: response.public_id,
              asset_id: response.asset_id,
              width: response.width,
              height: response.height,
              format: response.format,
              bytes: response.bytes,
              created_at: response.created_at
            });
          } else {
            const errDetail = response.error ? response.error.message : xhr.statusText;
            reject(new Error(`Cloudinary upload failed: ${errDetail}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse upload response: ${e.message}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error during Cloudinary upload. Please check your internet connection."));
      };

      xhr.send(formData);
    });
  }

  // Expose to window
  window.uploadToCloudinary = uploadToCloudinary;

})();
