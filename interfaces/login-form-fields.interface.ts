export interface InputFieldsProps {
  name: string;
  type: string;
  enterTitle: string;
  placeholder?: string;
  errors: any;
  defaultValue?: string;
  value?: string;
  min?: number;
  file?: File | null;
  filePicture?: string | null;
  autoComplete?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  isReadOnly?: boolean;
}
