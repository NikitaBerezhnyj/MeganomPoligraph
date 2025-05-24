export interface MailData {
  name: string;
  phone: string | null;
  email: string | null;
  type: string | null;
  size: string | null;
  material: string | null;
  print: string | null;
  embossing: string | null;
  handles: string | null;
  circulation: number;
  notes: string | null;
  language: "ua" | "en" | "ru";
}
