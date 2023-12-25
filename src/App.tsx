import React from "react";
import { Routes, Route } from "react-router-dom";

import {
  Home,
  Profile,
  UpdateProfile,
  Info,
  Write,
  Messages,
  Room,
} from "@/_root/pages";

import {
  About,
  Support,
  Faq
} from "@/components/shared";

import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-[100vh]">
      <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/info" element={<Info />}>
            {/* Children routes for "Info" */}
            <Route path="/info/about" element={<About />} />
            <Route path="/info/support" element={<Support />} />
            <Route path="/info/faq" element={<Faq />} />
          </Route>
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/:id" element={<Write />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/room/:id" element={<Room />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
