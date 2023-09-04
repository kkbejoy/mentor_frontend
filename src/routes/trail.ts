<BrowserRouter>
  <Routes>
    <Route path="/login" element={<LoginPage />}>
      {/* Add the elements in the below sub routes */}
      <Route path="mentees" element={<LoginPage />} />
      <Route path="mentors" element={<LoginPage />} />
      <Route path="moderator" element={<LoginPage />} />
    </Route>

    {/* /make this
          render the element mentee register */}
    <Route path="/trail" element={<SpinnerModal />} />
    <Route path="/mentee-register" element={<MenteeRegisterPage />} />
    <Route path="/mentor-register" element={<MentorRegisterPage />} />
    <Route path="/registrationsuccess" element={<RegistrationSuccssPage />} />

    <Route path="*" element={<NoMatchComponent />} />
    {/* Other routes */}
  </Routes>
</BrowserRouter>;
