export interface InputFieldsProps {
  name: string;
  type: string;
  enterTitle: string;
  placeholder: string;
  errors: any;
  defaultValue?: string;
  min?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file?: File | null;
  filePicture?: string | null;
}
