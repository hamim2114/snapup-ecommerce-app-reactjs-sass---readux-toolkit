import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import CartPage from './pages/cartPage/CartPage';
import CategoryProducts from './pages/categoryProducts/CategoryProducts';
import Home from './pages/home/Home';
import ProductSingle from './pages/productSingle/ProductSingle';
import Search from './pages/Search';

function App() {
   const Layout = () => {
      return (
         <>
            <Header />
            <Sidebar/>
            <Outlet />
            <Footer />
         </>
      );
   };

   const router = createBrowserRouter([
      {
         path: '/',
         element: <Layout />,
         children: [
            {
               path: '/',
               element: <Home />,
            },
            {
               path: '/product/:id',
               element: <ProductSingle />,
            },
            {
               path: '/category/:category',
               element: <CategoryProducts />,
            },
            {
               path: '/cart',
               element: <CartPage />,
            },
            {
               path: '/search/:searchTerm',
               element: <Search />,
            },
         ],
      },
   ]);
   return <RouterProvider router={router} />;
}

export default App;
