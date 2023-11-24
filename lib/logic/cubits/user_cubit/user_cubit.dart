import 'package:assignment12_front_end/data/models/user/user_model.dart';
import 'package:assignment12_front_end/data/repositories/user_repository.dart';
import 'package:assignment12_front_end/logic/cubits/user_cubit/user_state.dart';
import 'package:assignment12_front_end/logic/services/preferences.dart';
import 'package:assignment12_front_end/logic/services/token_manager.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UserCubit extends Cubit<UserState> {
  UserCubit() : super(UserInitialState()) {
    _initialize();
  }

  final UserRepository _userRepository = UserRepository();

  void _initialize() async {
    final userDetails = await Preferences.fetchUserDetails();
    String? email = userDetails['email'];
    String? password = userDetails['password'];

    if (email == null || password == null) {
      emit(UserLoggedOutState());
    } else {
      signIn(
        email: email,
        password: password,
      );
    }
  }

  void _emitLoggedInState({
    required UserModel userModel,
    required String email,
    required String password,
  }) async {
    await Preferences.saveUserDetails(
      email,
      password,
    );

    emit(UserLoggedInState(userModel));
  }

  void signIn({
    required String email,
    required String password,
  }) async {
    emit(UserLoadingState());
    try {
      UserModel userModel = await _userRepository.signIn(
        email: email,
        password: password,
      );
      _emitLoggedInState(
        userModel: userModel,
        email: email,
        password: password,
      );
    } catch (error) {
      emit(UserErrorState(error.toString()));
    }
  }

  void createAccount({
    required String email,
    required String password,
    required String fullName,
  }) async {
    emit(UserLoadingState());

    try {
      UserModel userModel = await _userRepository.signup(
        email: email,
        password: password,
        fullName: fullName,
      );
      _emitLoggedInState(
        userModel: userModel,
        email: email,
        password: password,
      );
    } catch (error) {
      emit(UserErrorState(error.toString()));
    }
  }

  Future<void> getUserByUserId(String userId) async {
    emit(UserLoadingState());
    try {
      UserModel userModel = await _userRepository.getUserById(userId);

      emit(UserLoggedInState(userModel));
    } catch (error) {
      emit(UserErrorState(error.toString()));
    }
  }

  Future<bool> updateUser(UserModel userModel) async {
    emit(UserLoadingState());

    try {
      UserModel updatedUser = await _userRepository.updateUser(userModel);

      emit(UserLoggedInState(updatedUser));
      return true;
    } catch (error) {
      emit(UserErrorState(error.toString()));
      return false;
    }
  }

  void signOut() async {
    await Preferences.clear();
    await TokenManager.deleteToken();
    emit(UserLoggedOutState());
  }
}
