import * as React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Header from '../components/Header';
import AboutPage from '../components/pages/about/AboutPage';
import EventsPage from '../components/pages/events/EventsPage';
import HomePage from '../components/pages/home/HomePage';
import Page404 from '../components/pages/Page404';
import PeoplePage from '../components/pages/people/PeoplePage';
import ProjectsPage from '../components/pages/projects/ProjectsPage';

class Router extends React.Component {
    
    public render() {

        return (
            <React.Fragment>
                <Header />
                <BrowserRouter>
                    <Switch>
                        <Route path={'/events'} component={EventsPage} />
                        <Route path={'/projects'} component={ProjectsPage} />
                        <Route path={'/people'} component={PeoplePage} />
                        <Route path={'/about'} component={AboutPage} />
                        <Route path={'/'} exact={true} component={HomePage} />
                        <Route path="/" component={Page404} />
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

export default Router;
