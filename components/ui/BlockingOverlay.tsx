type BlockingOverlayProps = {
  visible: boolean;
  label?: string;
};

const BlockingOverlay = ({
  visible,
  label = "Uploading...",
}: BlockingOverlayProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 rounded-xl  shadow-xl">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-purple-700 border-t-transparent"></div>
        <p className="text-sm text-white/50">{label}</p>
      </div>
    </div>
  );
};

export default BlockingOverlay;
