export const convertBufferToBase64 = (buffer, mimeType = "image/jpeg") => {
    return buffer ? `data:${mimeType};base64,${buffer.toString("base64")}` : null;
  };
  