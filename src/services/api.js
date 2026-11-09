
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "");

if (!API_BASE_URL) {
  console.warn(
    "EXPO_PUBLIC_API_URL is missing. Check your .env configuration."
  );
}

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("API URL is not configured.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  const isFormData =
    typeof FormData != "undeFined" &&
    options.body instanceof FormData;


  try {
    const response = await fetch(
      `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`,
      {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
         ...(isFormData ? {} : { "Content-Type": "application/json",}),
          ...options.headers,
        },
      }
    );

    const data = await response.json().catch(() => null);

  if (!response.ok) {
  console.error("API ERROR:", {
    status: response.status,
    response: data,
  });

  const message =
    typeof data?.detail === "string"
      ? data.detail
      : typeof data?.message === "string"
      ? data.message
      : `Request failed with status ${response.status}`;

  throw new Error(message);
}

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The server took too long to respond. Please try again.");
    }

    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to Imara. Check your internet connection and try again."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function loginUser(identifier, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      username: identifier.trim(),
      password,
    }),
  });
}

export async function getClasses(){
  return apiRequest("/api/academics/classes");
}

export async function registerStudent(studentData){
  return apiRequest("/api/auth/register/student", {
    method: "POST",
    body: JSON.stringify(studentData),
  });
}


export async function uploadStudentProfileImage(imageUrl, accessToken) {
  if (!imageUrl){
    throw new Error("No profile picture was selected.");

  }
  if(!accessToken){
    throw new Error("Authentication token is missing.");

  }

  const uriParts = imageUrl.split("/");
  const originaName = uriParts[uriParts.length - 1] || "profile.jpg";
  const extension = originaName
  .split("?")[0]
    .split(".")
    .pop()
    .toLowerCase();

  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };

  const mimeType = mimeTypes[extension] || "image/jpeg";

  const formData = new FormData();

  formData.append("file", {
    uri: imageUri,
    name: `profile.${mimeTypes[extension] ? extension : "jpg"}`,
    type: mimeType,
  });

  return apiRequest("/api/students/me/profile-image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  
}