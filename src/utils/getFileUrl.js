export function getFileId(url) {
  const regex = /\/GetFile\/(.+)/; // Sử dụng regex để tìm phần fileId
  const match = url.match(regex);
  return match ? match[1] : null; // Trả về fileId hoặc null nếu không tìm thấy
}

export function getFileUrl(fileId) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  return `${baseUrl}api/questions/GetFile/${fileId}`;
}