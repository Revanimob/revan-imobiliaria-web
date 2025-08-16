export function normalize(str: string) {
  return str
    .normalize("NFD") // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .toLowerCase()
    .trim();
}

// Função para converter arquivo para base64
export function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function getImageSrc(base64?: string) {
  console.log(base64);
  if (!base64) return "";
  if (base64.startsWith("data:")) {
    return base64; // já está pronto
  }
  return `data:image/jpeg;base64,${base64}`;
}
