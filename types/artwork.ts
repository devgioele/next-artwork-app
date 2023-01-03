export type ArtworkConcise = {
  id: number;
  title: string;
  date_start: number;
  date_end: number;
  artist_titles: string[];
  image_id: string | null;
};

export type ArtworkConciseDerived = ArtworkConcise & {
  // The compiled URL to a low resolution format of the image
  image_url_low?: string;
};

export type ArtworkDetailed = ArtworkConcise & {
  date_display: string;
  artist_display: string;
  place_of_origin: string;
  dimensions: string;
  is_on_view: boolean;
  technique_titles: string;
  theme_titles: string[];
  material_titles: string[];
  latitude: number;
  longitude: number;
};

export type ArtworkDetailedDerived = ArtworkDetailed & {
  // The compiled URL to a high resolution format of the image
  image_url_high?: string;
};
