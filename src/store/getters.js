export default {
  isLoggedIn (state) {
    return state.user.currentUserInfo.userId > 0
  }
}
