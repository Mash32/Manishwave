import React, { Component } from 'react';

import { fromHash } from '../globals/HashStore';
import initApp from '../globals/initApp';
import AppCanvas from '../components/AppCanvas';
import AppModules from '../components/AppModules';
import Drawer from '../components/Drawer';
import Panel from '../components/Panel';
import AppContext from '../contexts/AppContext';
import store from '../redux/store';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isDrawerOpen: false
        };

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);

        this.app = null;
    }

    componentDidMount() {
        this.app = initApp();
        window.addEventListener('hashchange', this.handleHashChange);
        this.forceUpdate();
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    openDrawer() {
        this.setState({ isDrawerOpen: true });
    }

    closeDrawer() {
        this.setState({ isDrawerOpen: false });
    }

    toggleDrawer() {
        if (this.state.isDrawerOpen) {
            this.closeDrawer();
        } else {
            this.openDrawer();
        }
    }

    handleHashChange() {
        fromHash(store);
    }

    render() {
        const {
            isDrawerOpen
        } = this.state;

        return (
            <AppContext.Provider value={this.app}>
                <AppModules />

                <header className="site-header" role="banner">
                    <div className="site-header-layout">
                        <div className="site-header-center">
                            <h1 className="site-headline">FlagWaver</h1>
                        </div>

                        <div className="site-header-left">
                            <Drawer.Button
                                className="site-header-btn drawer-btn"
                                target="drawer"
                                open={isDrawerOpen}
                                onClick={this.toggleDrawer}
                            >
                                <span className="icon icon-bars" aria-hidden="true">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </span>

                                <span className="sr-only">Menu</span>
                            </Drawer.Button>
                        </div>

                        <div className="site-header-right">
                            <button type="button" className="site-header-btn">
                                <span className="icon icon-dots" aria-hidden="true">
                                    <span className="icon-dot"></span>
                                    <span className="icon-dot"></span>
                                    <span className="icon-dot"></span>
                                </span>

                                <span className="sr-only">Options</span>
                            </button>
                        </div>
                    </div>
                </header>

                <main className="site-main" role="main">
                    <div className="app-viewer">
                        <div className="app-bg bg-sky"></div>

                        <AppCanvas />
                    </div>

                    <Drawer.Overlay
                        open={isDrawerOpen}
                        onClick={this.closeDrawer}
                    />

                    <Drawer id="drawer" open={isDrawerOpen}>
                        <Panel title="Edit Flag">
                        </Panel>
                    </Drawer>
                </main>
            </AppContext.Provider>
        );
    }
}