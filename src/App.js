import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Account from './components/Account';
import AddDinner from './components/AddDinner';
import AddNecessity from './components/AddNecessity';
import AddPresent from './components/AddPresent';
import AddTree from './components/AddTree';
import Alert from './components/Alert';
import Commitment from './components/Commitment';
import Commitments from './components/Commitments';
import Dinners from './components/Dinners';
import EditDinner from './components/EditDinner';
import EditNecessity from './components/EditNecessity';
import EditPresent from './components/EditPresent';
import EditTree from './components/EditTree';
import Home from './components/Home';
import Layout from './components/Layout';
import Necessities from './components/Necessities';
import NoPage from './components/NoPage';
import Presents from './components/Presents';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ResetPassword from './components/ResetPassword';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Spinner from './components/Spinner';
import TestPage from './components/TestPage';
import Trees from './components/Trees';
import { AlertContextProvider } from './context/AlertContext';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <AlertContextProvider>
        <Routes>
          <Route path="*" element={<Navigate to='/dashboard' />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute></ProtectedRoute>}>
              <Route index element={<Navigate to='/dashboard' />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/spinner" element={<Spinner />} />
              <Route path="/presents">
                <Route index element={<Presents />} />
                <Route path="/presents/new" element={<AddPresent />} />
                <Route path="/presents/edit/:id" element={<EditPresent />} />
              </Route>
              <Route path="/necessities">
                <Route index element={<Necessities />} />
                <Route path="/necessities/new" element={<AddNecessity />} />
                <Route path="/necessities/edit/:id" element={<EditNecessity />} />
              </Route>
              <Route path="/trees">
                <Route index element={<Trees />} />
                <Route path="/trees/new" element={<AddTree />} />
                <Route path="/trees/edit/:id" element={<EditTree />} />
              </Route>
              <Route path="/dinners">
                <Route index element={<Dinners />} />
                <Route path="/dinners/new" element={<AddDinner />} />
                <Route path="/dinners/edit/:id" element={<EditDinner />} />
              </Route>
              <Route element={<ProtectedRoute admin={true}></ProtectedRoute>}>
                <Route path="/commitments">
                  <Route index element={<Commitments />} />
                  <Route path="/commitments/edit/:id" element={<Commitment />} />
                </Route>
              </Route>
              <Route element={<ProtectedRoute admin={true}></ProtectedRoute>}>
                <Route path="/test">
                  <Route index element={<TestPage />} />
                  <Route path="/test/spinner" element={<Spinner />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </AlertContextProvider>
    </AuthContextProvider>
  );
}

export default App;
