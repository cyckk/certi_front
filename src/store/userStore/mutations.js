export function setUserProfile(state, payload) {
  console.log('saving profile details to store', payload);
  state.userProfile = payload;
  state.loggedIn = true;
  // console.log(state.userProfile);
}

//Logout mutation
export function destroySession(state) {
  console.log('Clearing user profile ');
  state.userProfile = null;
  state.loggedIn = false;
  // console.log(state.userProfile);
}
