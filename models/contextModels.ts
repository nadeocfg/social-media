export interface SignInResponseModel {
  token: string;
  username: string;
  name: string;
  email: string;
  photo: string;
  sex: string;
  about: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignInContext {
  isModalShow: boolean;
  showModal: (isLoading: boolean) => {};
  signInResponse: SignInResponseModel;
  setSingInResponse: (data: SignInResponseModel) => {};
}
