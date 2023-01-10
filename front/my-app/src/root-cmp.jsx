import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router } from "react-router-dom";
import { HomePage } from './page/home-page';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { About } from './page/about';
import { AppHeader } from './cmps/app-header';
import { ToyIndex } from './page/shop-index';
import { ToyDetails } from './page/toy-details';
import { ToyEdit } from './page/toy-edit';

import { UserMsg } from './cmps/user-msg';

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<About />} path="/about" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route  element={<ToyEdit />} path="/toy/edit"/>
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />

                        </Routes>
                    </main>
                    {/* <AppFooter /> */}
                </section>
                <UserMsg/>
            </Router>
        </Provider>



    )
}
