import useSWR from 'swr';
import { ArtworkConcise, ArtworkConciseDerived } from '../types/artwork';

type ArtworkConciseResponse = {
  data: ArtworkConcise[];
  info: {
     license_text: string;
  };
  config: {
    iiif_url: string;
  }
}

const compileImageUrl = (baseUrl: string, imageId: string, resolution: number) => 
  `${baseUrl}/${imageId}/full/${resolution},/0/default.jpg`;

const useArtworks = (limit: number, page: number) => {
  const { data, error, isLoading } = useSWR<ArtworkConciseResponse>(`https://api.artic.edu/api/v1/artworks?limit=${limit}&page=${page}&fields=id,title,date_start,date_end,artist_titles,image_id`);
  const derived: ArtworkConciseDerived[] | undefined = data?.data?.map(artwork => ({
    ...artwork,
    // See the artic documentation on image sizes:
    // https://api.artic.edu/docs/#image-sizes
    image_url_low: compileImageUrl(data.config.iiif_url, artwork.image_id, 200),
    image_url_high: compileImageUrl(data.config.iiif_url, artwork.image_id, 843),
  }))
  
  return {
    artworks: derived,
    isLoading,
    error
  }
}

export default useArtworks;
