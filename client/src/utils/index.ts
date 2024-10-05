import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import Resizer from "react-image-file-resizer";

export const handleEnterPress = (
  form: any,
  currentFieldName: string,
  nextFieldName: string | null,
) => {
  form.validateFields([currentFieldName]).then(() => {
    if (nextFieldName) {
      const nextField = form.getFieldInstance(nextFieldName);
      if (nextField) {
        nextField.focus();
      }
    } else {
      form.submit();
    }
  });
};

export const replaceName = (str: string) => {
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/ /g, "")
    .replace(/[:!@#$%^&*()?;/]/g, "");

  return str.toLowerCase();
};

const valueMap: {
  [key: string]: string;
} = {
  "Đang chờ xác nhận": "lime",
  "Đã lên lịch": "cyan",
  "Đang tiến hành": "geekblue",
  "Đã thay đổi lịch": "orange",
  "Đã hủy": "red",
  "Đã hoàn thành": "green",
};

export const getValue = (value: string) => {
  return valueMap[value];
};

export const uploadFile = async (file: any, folder: "customer" | "fish") => {
  const compressedFile: any = await handleResize(file);

  const fileName = replaceName(compressedFile.name);

  const storageRef = ref(storage, `${folder}/${fileName}`);

  const res = await uploadBytes(storageRef, file);

  if (res) {
    if (res.metadata.size === compressedFile.size) {
      return getDownloadURL(storageRef);
    } else {
      return "Uploading";
    }
  } else {
    return "Error upload";
  }
};

// Hàm nén ảnh
// Ủa nén sao thấy y nguyên vậy trời ???
const handleResize = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      720,
      "JPEG",
      80,
      0,
      (compressedFile) => {
        compressedFile && resolve(compressedFile);
      },
      "file",
    );
  });
