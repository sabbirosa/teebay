import { useQuery } from "@apollo/client";
import { Tabs } from "@mantine/core";
import ProductCard from "../components/ProductCard";
import {
  GET_PRODUCTS_BORROWED,
  GET_PRODUCTS_BOUGHT,
  GET_PRODUCTS_LENT,
  GET_PRODUCTS_SOLD,
} from "../graphql/transaction/queries";
import { useAuth } from "../hooks/useAuth";
import { Product } from "./MyProducts";

interface Transaction {
  id: string;
  product: Product;
  customer: {
    id: string;
    email: string;
  };
  transactionType: string;
  createdAt: string;
}

function History() {
  const { user } = useAuth();

  const { data: soldData, loading: soldLoading } = useQuery(GET_PRODUCTS_SOLD, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const { data: boughtData, loading: boughtLoading } = useQuery(
    GET_PRODUCTS_BOUGHT,
    {
      variables: { userId: user?.id },
      skip: !user?.id,
    }
  );

  const { data: lentData, loading: lentLoading } = useQuery(GET_PRODUCTS_LENT, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const { data: borrowedData, loading: borrowedLoading } = useQuery(
    GET_PRODUCTS_BORROWED,
    {
      variables: { userId: user?.id },
      skip: !user?.id,
    }
  );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Please log in to view your history
      </div>
    );

  return (
    <div>
      <Tabs defaultValue="bought" className="w-full mx-auto">
        {/* Tab List */}
        <Tabs.List className="flex justify-evenly mb-4 border-b border-gray-300 ">
          <Tabs.Tab
            value="bought"
            color="#6558F5"
            className="text-lg font-medium w-1/4"
          >
            Bought
          </Tabs.Tab>
          <Tabs.Tab
            value="sold"
            color="#6558F5"
            className="text-lg font-medium w-1/4"
          >
            Sold
          </Tabs.Tab>
          <Tabs.Tab
            value="borrowed"
            color="#6558F5"
            className="text-lg font-medium w-1/4"
          >
            Borrowed
          </Tabs.Tab>
          <Tabs.Tab
            value="lent"
            color="#6558F5"
            className="text-lg font-medium w-1/4"
          >
            Lent
          </Tabs.Tab>
        </Tabs.List>

        {/* Bought Tab */}
        <Tabs.Panel value="bought" pt="md">
          {boughtLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="w-2/3 mx-auto grid grid-cols-1 gap-6">
              {boughtData?.getProductsBought.map((transaction: Transaction) => (
                <ProductCard
                  key={transaction.id}
                  product={transaction.product}
                  showDateAndViews={false}
                />
              ))}
            </div>
          )}
        </Tabs.Panel>

        {/* Sold Tab */}
        <Tabs.Panel value="sold" pt="md">
          {soldLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="w-2/3 mx-auto grid grid-cols-1 gap-6">
              {soldData?.getProductsSold.map((transaction: Transaction) => (
                <ProductCard
                  key={transaction.id}
                  product={transaction.product}
                  showDateAndViews={false}
                />
              ))}
            </div>
          )}
        </Tabs.Panel>

        {/* Borrowed Tab */}
        <Tabs.Panel value="borrowed" pt="md">
          {borrowedLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="w-2/3 mx-auto grid grid-cols-1 gap-6">
              {borrowedData?.getProductsBorrowed.map(
                (transaction: Transaction) => (
                  <ProductCard
                    key={transaction.id}
                    product={transaction.product}
                    showDateAndViews={false}
                  />
                )
              )}
            </div>
          )}
        </Tabs.Panel>

        {/* Lent Tab */}
        <Tabs.Panel value="lent" pt="md">
          {lentLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="w-2/3 mx-auto grid grid-cols-1 gap-6">
              {lentData?.getProductsLent.map((transaction: Transaction) => (
                <ProductCard
                  key={transaction.id}
                  product={transaction.product}
                  showDateAndViews={false}
                />
              ))}
            </div>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default History;
