import { useState, useEffect } from "react";
import { Switch, Route, NavLink, useParams, useRouteMatch } from "react-router-dom";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailNutrition from "./ProductDetailNutrition";
import ProductDetailStorage from "./ProductDetailStorage";
import useFetch from "./useFetch";

export default function ProductDetails() {
  const [product, setProduct] = useState();
  const params = useParams();
  const match = useRouteMatch();
  const { get } = useFetch("https://react-tutorial-demo.firebaseio.com/");

  useEffect(() => {
    get(`productinfo/id${params.id}.json`)
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, []);

  if (!product) return null;

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img src={product.image} width="125" height="125" className="product-details-image" alt="product name here"
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url}>Details</NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="tab-active" to={`${match.url}/nutrition`}>Nutrition</NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="tab-active" to={`${match.url}/storage`}>Storage</NavLink>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path={match.path}>
            <ProductDetailInfo product={product} />
          </Route>
          <Route exact path={`${match.path}/nutrition`}>
            <ProductDetailNutrition nutrition={product.nutrition} />
          </Route>
          <Route exact path={`${match.path}/storage`}>
            <ProductDetailStorage storage={product.storage} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}