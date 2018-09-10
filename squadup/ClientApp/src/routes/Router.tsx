import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "../store/types";
import Header from "../components/Header";
import AboutPage from "../components/pages/about/AboutPage";
import EventsPage from "../components/pages/events/EventsPage";
import HomePage from "../components/pages/home/HomePage";
import Page404 from "../components/pages/Page404";
import PeoplePage from "../components/pages/people/PeoplePage";
import ProjectsPage from "../components/pages/projects/ProjectsPage";
// import DashboardPage from "../components/pages/dashboard/DashbaordPage";

/*const PrivateRoute = (props: any) => {
    const { isUserLoggedIn } = props;
    console.log(isUserLoggedIn);
    return (
        <Route
            {...props}
            render={() => {
                isUserLoggedIn === true ? (
                    <div>asdasdasd</div>
                ) : (
                    <Redirect to="/events" />
                );
            }}
        />
    );
    return <div>sad</div>;
};

<PrivateRoute
    path="/dashboard"
    Component={DashboardPage}
    isUserLoggedIn={this.props.isUserLoggedIn}
/>*/

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
                            <Route
                                path={"/events"}
                                component={EventsPage}
                                isUserLoggedIn={this.props.isUserLoggedIn}
                            />
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
