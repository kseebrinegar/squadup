import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../store/types";
import Header from "../components/Header";
import AboutPage from "../components/pages/about/AboutPage";
import EventsPage from "../components/pages/events/EventsPage";
import HomePage from "../components/pages/home/HomePage";
import Page404 from "../components/pages/Page404";
import PeoplePage from "../components/pages/people/PeoplePage";
import ProjectsPage from "../components/pages/projects/ProjectsPage";
import DashboardPage from "../components/pages/dashboard/DashbaordPage";

interface IAuthRoute {
    Component: React.ComponentClass<{}, {}>;
    isUserLoggedIn: boolean;
    path: string;
}

const PrivateRoute = ({
    Component,
    isUserLoggedIn,
    ...rest
}: IAuthRoute): JSX.Element => {
    return (
        <Route
            {...rest}
            render={(props): JSX.Element => {
                return isUserLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                );
            }}
        />
    );
};

interface IProps {
    isUserLoggedIn: boolean;
}

class Router extends React.Component<IProps, {}> {
    public render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <React.Fragment>
                        <Header />
                        <Switch>
                            <PrivateRoute
                                path="/dashboard"
                                Component={DashboardPage}
                                isUserLoggedIn={this.props.isUserLoggedIn}
                            />
                            <Route path={"/events"} component={EventsPage} />
                            <Route
                                path={"/projects"}
                                component={ProjectsPage}
                            />
                            <Route path={"/people"} component={PeoplePage} />
                            <Route path={"/about"} component={AboutPage} />
                            <Route
                                path={"/"}
                                exact={true}
                                component={HomePage}
                            />
                            <Route path="/" component={Page404} />
                        </Switch>
                    </React.Fragment>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    isUserLoggedIn: state.auth
});

export default connect(mapStateToProps)(Router);
