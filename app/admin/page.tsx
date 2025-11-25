import UploadWidget from "@/components/admin/UploadWidget";
import { cloudinaryPreset } from "../lib/constants";

const AdminPage = () => {
  return (
    <div className="bg-amber-50 h-screen">
      Admin route
      <UploadWidget
        btnText="Upload preview"
        preset={cloudinaryPreset.videoPreview}
      />
    </div>
  );
};

export default AdminPage;
