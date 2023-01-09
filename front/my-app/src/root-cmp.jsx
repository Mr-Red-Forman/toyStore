import './assets/style/main.css'

// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
// import { HomePage } from './page/home-page';
import { store } from './store/store';
import { Provider } from 'react-redux';



export function App() {

    return (
        <Provider store={store}>
            <Router>
                {/* <section className="main-layout app"> */}
                <section>
                    {/* <AppHeader /> */}
                    <main>
                            <h1>show your magic</h1> 
                        {/* <Routes> */}
                            {/* <Route element={<HomePage />} path="/" /> */}
                            {/* <Route element={<AboutUs />} path="/about" /> */}
                            {/* <Route element={<CarIndex />} path="/car" /> */}

                        {/* </Routes> */}
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>



    )
}
