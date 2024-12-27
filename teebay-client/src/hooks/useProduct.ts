import { useMutation, useQuery } from "@apollo/client";
import { INCREMENT_VIEWS } from "../graphql/product/mutations";
import { GET_PRODUCT } from "../graphql/product/queries";

export const useProduct = (id: string, view: boolean) => {
  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: { id },
    skip: !id,
  });

  const [incrementView] = useMutation(INCREMENT_VIEWS, {
    variables: { id },
  });

  if (view && data?.getProduct) {
    incrementView();
  }

  return {
    product: data?.getProduct,
    loading,
    error,
  };
};
