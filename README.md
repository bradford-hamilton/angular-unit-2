## Angular Unit-2

### 01-A-new-structure
1. What are possible issues with this new file structure?
 * Not sure until I try it and have issues, maybe with setting entry point with routes, etc in app in the route for deploying..
2. When thinking about extending the single responsibility principle to the app structure, what are some other ways that the app could be structured?
 * Maybe with an app.js in the route with angular app and routes.. then public folder for express static files etc..
3. What are the differences between serving files from an http server and from the file system? It seemed to work fine with just open index.html in the browser...
 * Can't do api calls etc..
4. Reflecting on the new structure and thinking back to lesson 1 - is Angular an MVC framework? How does the app structure support/disprove that?
 * It is but it leans towards MVVC (model view view controller).

### 02-Digest-Cycle
1. What is the difference between $scope.apply and $scope.digest?
  * scope.$digest() will fire watchers on the current scope, and on all of its children, too. scope.$apply will evaluate passed function and run $rootScope.$digest().
  The first one is faster, as it needs to evaluate watchers for current scope and its children. The second one is slower, as it needs to evaluate watchers for$rootScope and all it's child scopes.
  When an error occurs in one of the watchers and you use scope.$digest, it's not handled via $exceptionHandler service, so you need to handle exception yourself. scope.$apply uses a try-catch block internally and passes all exceptions to $exceptionHandler.https://www.sitepoint.com/understanding-angulars-apply-digest/
2. What is the digest cycle?
 * https://www.thinkful.com/projects/understanding-the-digest-cycle-528/
3. What is the scope life cycle? (this will require some additional reading)
 * The normal flow of a browser receiving an event is that it executes a corresponding JavaScript callback. Once the callback completes the browser re-renders the DOM and returns to waiting for more events.

When the browser calls into JavaScript the code executes outside the Angular execution context, which means that Angular is unaware of model modifications. To properly process model modifications the execution has to enter the Angular execution context using the $apply method. Only model modifications which execute inside the $apply method will be properly accounted for by Angular. For example if a directive listens on DOM events, such as ng-click it must evaluate the expression inside the $apply method.

After evaluating the expression, the $apply method performs a $digest. In the $digest phase the scope examines all of the $watch expressions and compares them with the previous value. This dirty checking is done asynchronously. This means that assignment such as $scope.username="angular" will not immediately cause a $watch to be notified, instead the $watch notification is delayed until the $digest phase. This delay is desirable, since it coalesces multiple model updates into one $watch notification as well as guarantees that during the $watch notification no other $watches are running. If a $watch changes the value of the model, it will force additional $digest cycle.

Creation

The root scope is created during the application bootstrap by the $injector. During template linking, some directives create new child scopes.

Watcher registration

During template linking, directives register watches on the scope. These watches will be used to propagate model values to the DOM.

Model mutation

For mutations to be properly observed, you should make them only within the scope.$apply(). Angular APIs do this implicitly, so no extra $apply call is needed when doing synchronous work in controllers, or asynchronous work with $http, $timeout or $interval services.

Mutation observation

At the end of $apply, Angular performs a $digest cycle on the root scope, which then propagates throughout all child scopes. During the $digest cycle, all $watched expressions or functions are checked for model mutation and if a mutation is detected, the $watch listener is called.

Scope destruction

When child scopes are no longer needed, it is the responsibility of the child scope creator to destroy them via scope.$destroy() API. This will stop propagation of $digest calls into the child scope and allow for memory used by the child scope models to be reclaimed by the garbage collector.
4. What does "bootstrapping an angular app" mean?
 * Bootstrapping is the equivalent of initializing, or starting, your Angular app. There are 2 main ways to do so.

The first is automatically bootstrapping by adding ng-app to the an element in your HTML, like so:

`<html ng-app="myApp">
...
</html>`
The second would be to bootstrap from the JavaScript, like so, after having creating your app through angular.module("myApp", []);

`angular.bootstrap(document, ['myApp']);`
### 03-Dependency-Injection
### 04-Custom-Filters
### 05-Routing
1. Why isn't ngRoute part of Angular core? Name at least 2 other Angular modules we could use
 * I thought it was... Use ui.router because it's the best!
2. Compare and contrast client-side routing with server-side routing
 * it's very cool and very similar, but it's actually all just done on the client side. We don't have to reload the page! It's all done in the browser and doesn't have to make a round trip to a server.
3. Aside from route definitions, what else can go in a .config()?
 * Dependency injection!
4. What is the $routeChangeSuccess event?
 * Broadcasted after a route change has happened successfully. The resolve dependencies are now available in the current.locals property.
### 06-http-service
1. What is a service? Is there a Ruby or JavaScript equivalent to Angular services?
  * Angular services are substitutable objects that are wired together using dependency injection (DI). You can use services to organize and share code across your app. Angular services are: Lazily instantiated – Angular only instantiates a service when an application component depends on it. They start with $, $http is one.
2. Explain in as much detail as possible what happens under the hood of $http.get()
  * Under the hood, AngularJS actually wires up a promise for an HTTP request in a way a bit like this:
  `var request = new XMLHttpRequest();  
  request.addEventListener("load", function() {  
    // complete the promise
  }, false);
  request.addEventListener("error", function() {  
    // fail the promise
  }, false);
  request.open("GET", "/api/my/name", true);  
  request.send();`
3. What is $q and how does it relate to $http?
  * A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.
