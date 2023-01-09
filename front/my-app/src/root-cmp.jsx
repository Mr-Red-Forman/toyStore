import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { HomePage } from './page/home-page';
import { store } from './store/store';



export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    {/* <AppHeader /> */}
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            {/* <Route element={<AboutUs />} path="/about" /> */}
                            {/* <Route element={<CarIndex />} path="/car" /> */}

                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
            </Router>
        </Provider>



    )
}
