import useSWR from 'swr';
import {
  ArtworkConcise,
  ArtworkConciseDerived,
  ArtworkDetailed,
  ArtworkDetailedDerived,
} from 'types/artwork';
import fetcher from 'data/base';

const baseUrl = 'https://api.artic.edu/api/v1';
const fieldsConcise = 'id,title,date_start,date_end,artist_titles,image_id';
const fieldsDetailed =
  'id,title,date_start,date_end,artist_titles,image_id,date_display,artist_display,place_of_origin,dimensions,is_on_view,technique_titles,theme_titles,material_titles,latitude,longitude';

type ArticResponse<T> = {
  info: {
    license_text: string;
  };
  config: {
    iiif_url: string;
  };
  data: T;
};

type ArticResponsePaginated<T> = ArticResponse<T> & {
  pagination: {
    total_pages: number;
  };
};

type ArtworkConciseResponse = ArticResponsePaginated<ArtworkConcise[]>;

type ArtworkDetailedResponse = ArticResponse<ArtworkDetailed>;

const compileImageUrl = (
  baseUrl: string,
  imageId: string | null,
  resolution: number
) =>
  imageId
    ? `${baseUrl}/${imageId}/full/${resolution},/0/default.jpg`
    : undefined;

const compileUrlConcise = (limit: number, page: number, query?: string) =>
  query
    ? `${baseUrl}/artworks/search?q=${query}&limit=${limit}&page=${page}&fields=${fieldsConcise}`
    : `${baseUrl}/artworks?limit=${limit}&page=${page}&fields=${fieldsConcise}`;

export const fetchArtworks = async (
  limit: number,
  page: number
): Promise<{ artworks: ArtworkConciseResponse; url: string }> => {
  const url = compileUrlConcise(limit, page);
  return { artworks: await fetcher(url), url };
};

/** A wrapper of `useSWR` that fetches artworks from the art institute of Chicago.
Optionally accepting a search query, in which case artworks are searched and sorted
in descending order according to their matching score. */
export const useArtworks = (limit: number, page: number, query?: string) => {
  const { data, error, isLoading } = useSWR<ArtworkConciseResponse>(
    compileUrlConcise(limit, page, query)
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
    })
  );

  return {
    artworks: derived,
    maxPage: data?.pagination.total_pages,
    isLoading,
    error,
  };
};

export const useArtwork = (id: number | null) => {
  const { data, error, isLoading } = useSWR<ArtworkDetailedResponse>(
    id !== null ? `${baseUrl}/artworks/${id}?fields=${fieldsDetailed}` : null
  );

  const derived: ArtworkDetailedDerived | undefined = data?.data && {
    ...data.data,
    image_url_high: compileImageUrl(
      data.config.iiif_url,
      data.data.image_id,
      843
    ),
  };

  return {
    artwork: derived,
    isLoading,
    error,
  };
};
