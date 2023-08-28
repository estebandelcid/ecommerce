import { useContext } from "react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
      if (context.filteredItems?.length > 0) {
        return(context.filteredItems?.map((item) => (
            <Card data={item} key={item.id} />
          )))
      } else {
       return(
        <p>{`No results for ${context.searchByTitle}`}</p>
       )
      }
    
  };
  return (
    <Layout>
      <div className="flex w-80 items-center justify-center mb-4 relative">
        <h1 className="font-medium text-3xl">Home</h1>
      </div>
          <div className="relative w-80 flex items-center mb-8 focus-within:text-black/60">
                <MagnifyingGlassIcon className="absolute w-6 h-6 ml-3 pointer-events-none"/>
                <input
                  className="w-full py-3 pl-11 pr-3 rounded-lg border border-black focus:outline-none"
                  type="text"
                  placeholder="Search Products"
                  onChange={(e) => context.setSearchByTitle(e.target.value)}
            />
          </div>

      <div className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
