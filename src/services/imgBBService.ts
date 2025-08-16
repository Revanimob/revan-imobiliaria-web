const apiKey = "5aec958582bec5311e22150d3c4d7f11";
export async function uploadToImgBB(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    return data.data.url as string;
  } catch (err) {
    console.error("Erro ao enviar para ImgBB:", err);
    return null;
  }
}
