import useSWR from "swr";
import { ArtworkConcise, ArtworkConciseDerived } from "types/artwork";
import fetcher from "data/base";

const baseUrl = "https://api.artic.edu/api/v1";
const fields = "id,title,date_start,date_end,artist_titles,image_id";

type ArtworkConciseResponse = {
  pagination: {
    total_pages: number;
  };
  data: ArtworkConcise[];
  info: {
    license_text: string;
  };
  config: {
    iiif_url: string;
  };
};

const compileImageUrl = (
  baseUrl: string,
  imageId: string | null,
  resolution: number
) =>
  imageId
    ? `${baseUrl}/${imageId}/full/${resolution},/0/default.jpg`
    : undefined;

const compileUrl = (limit: number, page: number, query?: string) =>
  query
    ? `${baseUrl}/artworks/search?q=${query}&limit=${limit}&page=${page}&fields=${fields}`
    : `${baseUrl}/artworks?limit=${limit}&page=${page}&fields=${fields}`;

export const fetchArtworks = async (limit: number, page: number) => {
  const url = compileUrl(limit, page);
  return { artworks: await fetcher(url), url };
};

/** A wrapper of `useSWR` that fetches artworks from the art institute of Chicago.
Optionally accepting a search query. In which case artworks are searched and sorted in descending order
according to their matching score. */
export const useArtworks = (limit: number, page: number, query?: string) => {
  const { data, error, isLoading } = useSWR<ArtworkConciseResponse>(
    compileUrl(limit, page, query)
  );
  const derived: ArtworkConciseDerived[] | undefined = data?.data?.map(
    (artwork) => ({
      ...artwork,
      // See the artic documentation on image sizes:
      // https://api.artic.edu/docs/#image-sizes
      image_url_low: compileImageUrl(
        data.config.iiif_url,
        artwork.image_id,
        200
      ),
      image_url_high: compileImageUrl(
        data.config.iiif_url,
        artwork.image_id,
        843
      ),
    })
  );

  return {
    artworks: derived,
    maxPage: data?.pagination.total_pages,
    isLoading,
    error,
  };
};
