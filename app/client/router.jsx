const {Router, Route, IndexRoute, history} = ReactRouter;

const browserHistory = history.createHistory();

//const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)()

Meteor.startup(function() {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/login" component={Login} />
      <Route path="/" component={AppBody}>
        <IndexRoute component={Home} />
        <Route path="*" component={AppNotFound} />
        {/* ... */}
      </Route>
    </Router>
  ), document.getElementById("app"));
});
