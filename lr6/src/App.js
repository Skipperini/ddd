import React, { useState } from 'react';
import Header from "./components/header"
import Footer from "./components/footer"
import Categories from "./components/categories"
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductList from "./components/ProductList";
import {useLogger} from './components/myHooks';
import  DebugHistory from './components/DebugHistory';
import { useContext } from 'react';
export const ProductsContext = React.createContext();
const products = [
  {
    id:1,
    name:'Cat Collar - Black Denim',
    img:'https://cdn.shopify.com/s/files/1/1199/8502/products/BlackCatCollar_1.jpg?v=1642400527',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et pretium nunc, vel faucibus mi. Morbi gravida dolor eget iaculis vulputate. Cras justo nunc, laoreet vitae vulputate ac, euismod ac nisl. Etiam rhoncus eget velit vitae vulputate. Praesent mollis sollicitudin augue vel varius. Nullam vel enim urna. Duis cursus vulputate dolor, nec efficitur mauris tincidunt ac. Proin sed efficitur velit. Duis sodales urna eget molestie dignissim. Proin eget tellus eget mauris scelerisque facilisis.',
    category:'collar',
    price:'460',
    agreement: false,
    comments: []
  },
  {
    id:2,
    name:'Cat Collar - Red & White',
    img:'https://cdn.shopify.com/s/files/1/1199/8502/products/Red_WhiteChecksCatCollar_1.jpg?v=1642401578',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et pretium nunc, vel faucibus mi. Morbi gravida dolor eget iaculis vulputate. Cras justo nunc, laoreet vitae vulputate ac, euismod ac nisl. Etiam rhoncus eget velit vitae vulputate. Praesent mollis sollicitudin augue vel varius. Nullam vel enim urna. Duis cursus vulputate dolor, nec efficitur mauris tincidunt ac. Proin sed efficitur velit. Duis sodales urna eget molestie dignissim. Proin eget tellus eget mauris scelerisque facilisis.',
    category:'collar',
    price:'450',
    agreement: false,
    comments: []
  },
  {
    id:3,
    name:'Cute Pet Bib-Duck',
    img:'https://cdn.shopify.com/s/files/1/1199/8502/products/IMG_0772_1.jpg?v=1663392810',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et pretium nunc, vel faucibus mi. Morbi gravida dolor eget iaculis vulputate. Cras justo nunc, laoreet vitae vulputate ac, euismod ac nisl. Etiam rhoncus eget velit vitae vulputate. Praesent mollis sollicitudin augue vel varius. Nullam vel enim urna. Duis cursus vulputate dolor, nec efficitur mauris tincidunt ac. Proin sed efficitur velit. Duis sodales urna eget molestie dignissim. Proin eget tellus eget mauris scelerisque facilisis.',
    category:'bib',
    price:'400',
    agreement: false,
    comments: []
  },
  {
    id:4,
    name:'Cheerble Ball',
    img:'https://cdn.shopify.com/s/files/1/1199/8502/products/fa804eac6fff01780f91d7571f16b04c_720x_27301160-930b-4df7-9151-ba5415f57aad.jpg?v=1666080533',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et pretium nunc, vel faucibus mi. Morbi gravida dolor eget iaculis vulputate. Cras justo nunc, laoreet vitae vulputate ac, euismod ac nisl. Etiam rhoncus eget velit vitae vulputate. Praesent mollis sollicitudin augue vel varius. Nullam vel enim urna. Duis cursus vulputate dolor, nec efficitur mauris tincidunt ac. Proin sed efficitur velit. Duis sodales urna eget molestie dignissim. Proin eget tellus eget mauris scelerisque facilisis.',
    category:'toy',
    price:'150',
    agreement: false,
    comments: []
  },
  {
    id:5,
    name:'Cat Wand Toy Beaver',
    img:'https://cdn.shopify.com/s/files/1/1199/8502/products/Image_1_11792ee0-ce29-4424-ba8d-04d8f179c80f.jpg?v=1643691216',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et pretium nunc, vel faucibus mi. Morbi gravida dolor eget iaculis vulputate. Cras justo nunc, laoreet vitae vulputate ac, euismod ac nisl. Etiam rhoncus eget velit vitae vulputate. Praesent mollis sollicitudin augue vel varius. Nullam vel enim urna. Duis cursus vulputate dolor, nec efficitur mauris tincidunt ac. Proin sed efficitur velit. Duis sodales urna eget molestie dignissim. Proin eget tellus eget mauris scelerisque facilisis.',
    category:'toy',
    price:'400',
    agreement: false,
    comments: []
  },
  {
    id:6,
    name:'Chicken & COD Sandwich Treats for Cats and Kittens ',
    img:'https://cdn.shopify.com/s/files/1/1199/8502/products/81nqpxQgHdL._SL1500.jpg?v=1647445284',
    desc:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et pretium nunc, vel faucibus mi. Morbi gravida dolor eget iaculis vulputate. Cras justo nunc, laoreet vitae vulputate ac, euismod ac nisl. Etiam rhoncus eget velit vitae vulputate. Praesent mollis sollicitudin augue vel varius. Nullam vel enim urna. Duis cursus vulputate dolor, nec efficitur mauris tincidunt ac. Proin sed efficitur velit. Duis sodales urna eget molestie dignissim. Proin eget tellus eget mauris scelerisque facilisis.',
    category:'food',
    price:'180',
    agreement: false,
    comments: []
  },
  
]


function App() {
  
  const categories = [...new Set(products.map((product) => product.category))];
  const [history, setHistory] = useState([]);
  return (
    <div className="mainBlock">
        
     <Header/>
     <ProductsContext.Provider value={{ products, categories, setHistory }}>
      <Router>
      
        <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/products/:id" component={ProductDetails} />
            <Route path="/category/:categoryName" component={ProductList} />
        </Switch>
      </Router>
    </ProductsContext.Provider>
    <Footer/>
    
    </div>
  );
};

export default App;
