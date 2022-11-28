import Image from "next/image";
import { useRef } from "react";

type SelectPhotoModel = {
  file: File | null;
  onChange: (value: FileList | null | undefined) => void;
};

const SelectPhoto = ({ onChange }: SelectPhotoModel) => {
  const selectPhotoRef = useRef<HTMLInputElement>(null);

  const selectFile = () => {
    if (selectPhotoRef.current) {
      selectPhotoRef.current.click();
    }
  };

  return (
    <div className="select-photo" onClick={selectFile}>
      <input
        className="select-photo__input"
        ref={selectPhotoRef}
        type="file"
        onChange={() => onChange(selectPhotoRef.current?.files)}
        accept="image/*"
      />

      {selectPhotoRef.current?.files &&
      selectPhotoRef.current?.files.length > 0 ? (
        <Image
          width="300"
          height="300"
          src={window.URL.createObjectURL(selectPhotoRef.current?.files[0])}
          alt="preview"
        />
      ) : (
        <p>Click or drag file to this area to upload</p>
      )}
    </div>
  );
};

export default SelectPhoto;
