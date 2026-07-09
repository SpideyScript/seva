import { Routes, Route } from "react-router-dom";
import React,{ Suspense , lazy } from "react";
import PageLoader from './Components/PageLoader';

const lazyWithDelay = (importFunc, delay = 600) => {
  return lazy(() => 
    Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  );
};

const Login = lazy(() => import("./Auth/Login"));
const Firstpage = lazy(() => import("./components/Firstpage"));
const Signup = lazy(() => import("./Auth/Signup"));
const User = lazy(() => import("./User"));
const UserDashboard = lazy(() => import("./components/UserDashboard"));
const PostProblem = lazy(() => import("./components/PostProblem"));
const MyRequests = lazy(() => import("./components/Myrequest"));
const RequestDetails = lazy(() => import("./components/Requestdetails"));
const Provider = lazy(() => import("./Provider"));
const ProviderDashboard = lazy(() => import("./components/ProvieDashboard"));
const NearbyRequests = lazy(() => import("./components/near-by"));
const SendQuote = lazy(() => import("./components/send-quote"));
const ProviderProfileSetup = lazy(() => import("./components/ProviderProfileSetup"));


function AppRoutes() {
  return (
     <Suspense fallback={<PageLoader />}>
    <Routes>
     
      <Route path="/" element={<Firstpage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/provider-setup" element={<ProviderProfileSetup />} />
      <Route path="/Userdashboard" element={<User />}>
        <Route index element={<UserDashboard />} />
        <Route path="post-problem" element={<PostProblem />} />
        <Route path="my-requests" element={<MyRequests />} />
        <Route path="request-details/:id" element={<RequestDetails />} />
      </Route>
      <Route path="/provider-dashboard" element={<Provider />}>
        <Route index element={<ProviderDashboard />} />
        <Route path="near-by" element={<NearbyRequests />} />
        <Route path="earning" element={<MyRequests />} />

        
        <Route path="send-quote/:id" element={<SendQuote />} />
      </Route>
    
    </Routes>
     </Suspense>
  );
}

export default AppRoutes;