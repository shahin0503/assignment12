import 'package:assignment12_front_end/core/ui.dart';
import 'package:assignment12_front_end/data/models/blog/blog_model.dart';
import 'package:assignment12_front_end/logic/cubits/blog_cubit/blog_cubit.dart';
import 'package:assignment12_front_end/presentation/widgets/gap_widget.dart';
import 'package:assignment12_front_end/presentation/widgets/primary_button.dart';
import 'package:assignment12_front_end/presentation/widgets/primary_textfield.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CreateEditBlogScreen extends StatefulWidget {
  final BlogPreferences blogPreferences;
  const CreateEditBlogScreen({
    super.key,
    required this.blogPreferences,
  });

  static const routeName = 'create-edit-blog';

  @override
  State<CreateEditBlogScreen> createState() => _CreateEditBlogScreenState();
}

class _CreateEditBlogScreenState extends State<CreateEditBlogScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  String _selectedCategory = 'Comedy';
  String imageUrl = '';

  @override
  void initState() {
    super.initState();
    if (widget.blogPreferences.blogChoice) {
      imageUrl = widget.blogPreferences.blogModel!.image!;
      _titleController.text = widget.blogPreferences.blogModel!.title!;
      _selectedCategory = widget.blogPreferences.blogModel!.category!;
      _descriptionController.text =
          widget.blogPreferences.blogModel!.description!;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.blogPreferences.blogChoice ? 'Edit Blog' : 'Create Blog',
        ),
      ),
      body: SafeArea(
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8.0),
                    child: CachedNetworkImage(
                      width: MediaQuery.of(context).size.width / 2,
                      height: MediaQuery.of(context).size.width / 2,
                      fit: BoxFit.cover,
                      imageUrl: imageUrl,
                    ),
                  ),
                  const GapWidget(),
                  PrimaryTextField(
                    labelText: 'Title',
                    controller: _titleController,
                  ),
                  const GapWidget(),
                  PrimaryTextField(
                    labelText: 'Description',
                    controller: _descriptionController,
                  ),
                  const GapWidget(),
                  Row(
                    children: [
                      Text(
                        'Select category: ',
                        style: TextStyles.body1,
                      ),
                      const GapWidget(),
                      Expanded(
                        child: DropdownButton<String>(
                          value: _selectedCategory,
                          onChanged: (String? newValue) {
                            setState(() {
                              _selectedCategory = newValue!;
                            });
                          },
                          items: <String>[
                            'Comedy',
                            'Science',
                            'Physics',
                            'Artificial technology'
                          ].map<DropdownMenuItem<String>>((String value) {
                            return DropdownMenuItem<String>(
                              value: value,
                              child: Text(value),
                            );
                          }).toList(),
                        ),
                      ),
                    ],
                  ),
                  const GapWidget(
                    size: 10,
                  ),
                  PrimaryButton(
                    onPressed: () {
                      if (!widget.blogPreferences.blogChoice) {
                        final newBlog = BlogModel(
                          title: _titleController.text,
                          description: _descriptionController.text,
                          category: _selectedCategory,
                        );
                        context.read<BlogCubit>().addBlog(newBlog);
                      } else {
                        final updatedBlog = BlogModel(
                          title: _titleController.text,
                          description: _descriptionController.text,
                          category: _selectedCategory,
                        );
                        context.read<BlogCubit>().updateBlog(
                              updatedBlog,
                              widget.blogPreferences.blogModel!.id!,
                            );
                      }

                      Navigator.pop(context);
                    },
                    text: 'Save',
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
