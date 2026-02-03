export type UploadedLogo = {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
};

export type UploadedLogoResponse = {
  files: UploadedLogo[];
};
