import QRCode from "qrcode";

export const generateQRCode = async (cafeId: string) => {
  const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173/menu";
  const url = `${baseUrl}?cafeId=${cafeId}`;
  const qr = await QRCode.toDataURL(url);
  return qr;
};
