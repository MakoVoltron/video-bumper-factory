import ButtonModal from "./ButtonModal";
import Video from "./Video";

type ConfirmModalProps = {
  title: string;
  description: string;
  videoUrl?: string;
  posterUrl?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  title,
  description,
  videoUrl,
  posterUrl,
  isLoading,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <p className="text-slate-600">{description}</p>
        </div>
        {videoUrl && posterUrl && (
          <>
            <div className="w-[500px] rounded overflow-hidden">
              <Video videoUrl={videoUrl} posterUrl={posterUrl} mode="loop" />
            </div>
          </>
        )}
        <div className="flex justify-end gap-2">
          <ButtonModal label="Cancel" onClick={onCancel} />
          <ButtonModal
            label="Confirm"
            variation="danger"
            isLoading={isLoading}
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
