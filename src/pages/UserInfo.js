class UserInfo {
  constructor({ userName, userDescription }) {
    this.userName = userName;
    this.userDescription = userDescription;
  }

  getUserInfo() {
    return { userName: this.userName, userDescription: this.userDescription };
  }

  setUserInfo(userData) {
    const profileName = document.querySelector(".profile__name");
    const profileDescription = document.querySelector(".profile__description");
    profileName.textContent = userData.userName;
    profileDescription.textContent = userData.userDescription;
  }
}
