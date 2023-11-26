import 'package:assignment12_front_end/core/ui.dart';
import 'package:assignment12_front_end/data/models/project/project_model.dart';
import 'package:assignment12_front_end/logic/cubits/project_cubit/project_cubit.dart';
import 'package:assignment12_front_end/presentation/widgets/gap_widget.dart';
import 'package:assignment12_front_end/presentation/widgets/primary_button.dart';
import 'package:assignment12_front_end/presentation/widgets/primary_textfield.dart';
import 'package:assignment12_front_end/presentation/widgets/snackbar.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:material_tag_editor/tag_editor.dart';

class CreateEditProjectScreen extends StatefulWidget {
  final ProjectPreferences projectPreferences;

  const CreateEditProjectScreen({
    super.key,
    required this.projectPreferences,
  });

  static const routeName = 'create-edit-project';

  @override
  State<CreateEditProjectScreen> createState() =>
      _CreateEditProjectScreenState();
}

class _CreateEditProjectScreenState extends State<CreateEditProjectScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _gitUrlController = TextEditingController();
  final TextEditingController _demoUrlController = TextEditingController();
  List<String> technologiesUsed = [];

  @override
  void initState() {
    super.initState();
    if (widget.projectPreferences.projectChoice) {
      _titleController.text = widget.projectPreferences.projectModel!.title!;
      _descriptionController.text =
          widget.projectPreferences.projectModel!.description!;
      _gitUrlController.text = widget.projectPreferences.projectModel!.gitUrl!;
      _demoUrlController.text =
          widget.projectPreferences.projectModel!.demoUrl!;
      technologiesUsed =
          widget.projectPreferences.projectModel!.technologiesUsed!;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.projectPreferences.projectChoice
              ? 'Edit Project'
              : 'Create Project',
        ),
      ),
      body: SafeArea(
        child: ListView(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                children: [
                  PrimaryTextField(
                    prefixIcon: const Icon(Icons.title),
                    labelText: 'Title',
                    controller: _titleController,
                  ),
                  const GapWidget(),
                  PrimaryTextField(
                    prefixIcon: const Icon(Icons.description),
                    labelText: 'Description',
                    controller: _descriptionController,
                  ),
                  const GapWidget(),
                  PrimaryTextField(
                    prefixIcon: const Icon(Icons.link),
                    labelText: 'Git URL',
                    controller: _gitUrlController,
                  ),
                  const GapWidget(),
                  PrimaryTextField(
                    prefixIcon: const Icon(Icons.link),
                    labelText: 'Demo URL',
                    controller: _demoUrlController,
                  ),
                  const GapWidget(),
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10.0),
                      border: Border.all(),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Text(
                            'Technologies used',
                            style: TextStyles.body1,
                          ),
                        ),
                        const GapWidget(
                          size: -10,
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: TagEditor(
                            length: technologiesUsed.length,
                            delimiters: const [','],
                            hasAddButton: true,
                            textInputAction: TextInputAction.next,
                            autofocus: false,
                            maxLines: 1,
                            inputDecoration: InputDecoration(
                              isDense: true,
                              border: const OutlineInputBorder(
                                borderRadius: BorderRadius.all(
                                  Radius.circular(20.0),
                                ),
                              ),
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: AppColors.accent),
                                borderRadius: const BorderRadius.all(
                                  Radius.circular(20.0),
                                ),
                              ),
                              labelText: 'Add technologies...',
                              labelStyle: const TextStyle(
                                fontStyle: FontStyle.italic,
                                fontWeight: FontWeight.bold,
                                color: Colors.grey,
                                fontSize: 14,
                              ),
                            ),
                            onTagChanged: (newValue) {
                              setState(() {
                                technologiesUsed.add(newValue);
                              });
                            },
                            tagBuilder: (context, index) {
                              return Chip(
                                label: Text(technologiesUsed[index]),
                                onDeleted: () {
                                  setState(() {
                                    technologiesUsed.removeAt(index);
                                  });
                                },
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                  const GapWidget(
                    size: 20,
                  ),
                  PrimaryButton(
                    onPressed: () {
                      if (!widget.projectPreferences.projectChoice) {
                        final newProject = ProjectModel(
                          title: _titleController.text,
                          description: _descriptionController.text,
                          gitUrl: _gitUrlController.text,
                          demoUrl: _demoUrlController.text,
                          technologiesUsed: technologiesUsed,
                          userId: widget.projectPreferences.userId,
                        );
                        context.read<ProjectCubit>().addProject(newProject);
                        SnackBarWidget.showSnackbar(
                            context, 'Project added successfully!');
                      } else {
                        final updatedProject = ProjectModel(
                          title: _titleController.text,
                          description: _descriptionController.text,
                          gitUrl: _gitUrlController.text,
                          demoUrl: _demoUrlController.text,
                          technologiesUsed: technologiesUsed,
                          userId: widget.projectPreferences.userId,
                        );
                        context.read<ProjectCubit>().updateProject(
                              updatedProject,
                              widget.projectPreferences.projectModel!.id!,
                            );
                            SnackBarWidget.showSnackbar(
                            context, 'Project updated successfully!');
                      }
                      Navigator.of(context).pop();
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
