
import './App.scss';
import { Route, BrowserRouter as Switch } from "react-router-dom";
import './styles/mixins/global.scss';
import { BrowserRouter } from 'react-router-dom';
import { Suspense, } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Layout from './Route';
import "../src/components/i18n";

function App() {
  // const path = window.location.pathname;

  // useEffect(() => {
  //   path = window.location.pathname;
  // }, []);
  const loading = () => "Loading...";
return (
    <>
      <BrowserRouter>
        <Switch>
          <Suspense fallback={loading()}>
            {/* <ToastContainer /> */}
            <Route
              path="/"
              render={() => {
                return <Layout />;
              }}
            />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
