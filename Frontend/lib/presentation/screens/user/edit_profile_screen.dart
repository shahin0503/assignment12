import 'dart:developer';
import 'dart:io';

import 'package:assignment12_front_end/core/ui.dart';
import 'package:assignment12_front_end/data/models/user/user_model.dart';
import 'package:assignment12_front_end/data/repositories/user_repository.dart';
import 'package:assignment12_front_end/logic/cubits/user_cubit/user_cubit.dart';
import 'package:assignment12_front_end/logic/cubits/user_cubit/user_state.dart';
import 'package:assignment12_front_end/presentation/widgets/gap_widget.dart';
import 'package:assignment12_front_end/presentation/widgets/primary_button.dart';
import 'package:assignment12_front_end/presentation/widgets/primary_textfield.dart';
import 'package:assignment12_front_end/presentation/widgets/snackbar.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:image_picker/image_picker.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  static const routeName = 'edit_profile';

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  String imageUrl = '';
  File? _image;

  Future<void> _getImage() async {
    final imagePicker = ImagePicker();
    final pickedFile = await imagePicker.pickImage(source: ImageSource.gallery);

    setState(() {
      if (pickedFile != null) {
        _image = File(pickedFile.path);
        imageUrl = '';

        _uploadImage();
      }
    });
  }

  Future<void> _uploadImage() async {
    try {
      if (_image != null) {
        final response = await UserRepository().uploadUserImage(_image!);
        log('response: $response');
        setState(() {
          imageUrl = response;
        });
      }
    } catch (error) {
      log("Error uploading image: $error");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Profile'),
      ),
      body: SafeArea(
        child: BlocBuilder<UserCubit, UserState>(
          builder: (context, state) {
            if (state is UserLoadingState) {
              return const Center(
                child: CircularProgressIndicator(),
              );
            } else if (state is UserErrorState) {
              return Center(
                child: Text(state.message),
              );
            } else if (state is UserLoggedInState) {
              return editProfile(state.userModel);
            }
            return const Center(
              child: Text('An error occured!!'),
            );
          },
        ),
      ),
    );
  }

  Widget editProfile(UserModel userModel) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Center(
          child: ClipOval(
            child: GestureDetector(
              onTap: _getImage,
              child: _image != null
                  ? Image.file(
                      _image!,
                      width: MediaQuery.of(context).size.width / 2,
                      height: MediaQuery.of(context).size.width / 2,
                      fit: BoxFit.cover,
                    )
                  : ({userModel.image}.isNotEmpty
                      ? CachedNetworkImage(
                          width: MediaQuery.of(context).size.width / 2,
                          height: MediaQuery.of(context).size.width / 2,
                          fit: BoxFit.cover,
                          imageUrl: userModel.image!,
                        )
                      : Container(
                          decoration: BoxDecoration(
                            border: Border.all(
                              color: AppColors.text,
                              width: 0.5,
                            ),
                          ),
                          width: MediaQuery.of(context).size.width / 2,
                          height: MediaQuery.of(context).size.width / 2,
                          child: const Icon(Icons.image),
                        )),
            ),
          ),
        ),
        const GapWidget(),
        Text(
          'Personal Details',
          style: TextStyles.body1.copyWith(
            fontWeight: FontWeight.bold,
            color: AppColors.accent,
          ),
        ),
        const GapWidget(),
        PrimaryTextField(
          prefixIcon: const Icon(Icons.person),
          labelText: 'Full Name',
          initialValue: userModel.fullName,
          onChanged: (value) {
            userModel.fullName = value;
          },
        ),
        const GapWidget(),
        PrimaryTextField(
          prefixIcon: const Icon(Icons.edit),
          labelText: 'Bio',
          initialValue: userModel.bio,
          onChanged: (value) {
            userModel.bio = value;
          },
        ),
        const GapWidget(),
        PrimaryTextField(
          prefixIcon: const Icon(Icons.phone),
          labelText: 'Phone number',
          initialValue: userModel.phoneNumber,
          onChanged: (value) {
            userModel.phoneNumber = value;
          },
        ),
        const GapWidget(),
        PrimaryButton(
          onPressed: () async {
            bool success =
                await BlocProvider.of<UserCubit>(context).updateUser(userModel);
            SnackBarWidget.showSnackbar(
                context, 'Profile updated successfully!');
            if (success) {
              Navigator.pop(context);
            }
          },
          text: 'Save',
        ),
      ],
    );
  }
}
