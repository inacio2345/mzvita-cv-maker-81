export type AdType = 'code' | 'image';

export interface Advertisement {
  id: string;
  title: string;
  slot_name: string;
  desktop_type: AdType;
  desktop_content: string | null;
  mobile_type: AdType;
  mobile_content: string | null;
  redirect_url: string | null;
  is_active: boolean;
  created_at: string;
}
