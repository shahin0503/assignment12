import 'package:assignment12_front_end/data/models/project/project_model.dart';
import 'package:assignment12_front_end/logic/cubits/project_cubit/project_cubit.dart';
import 'package:assignment12_front_end/presentation/screens/project/create_edit_project_screen.dart';
import 'package:assignment12_front_end/presentation/widgets/gap_widget.dart';
import 'package:assignment12_front_end/presentation/widgets/generic_dialog.dart';
import 'package:assignment12_front_end/presentation/widgets/snackbar.dart';
import 'package:flutter/material.dart';
import 'package:assignment12_front_end/core/ui.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:url_launcher/url_launcher.dart';

class ProjectDisplayWidget extends StatelessWidget {
  final List<ProjectModel> projects;
  final bool? choice;

  const ProjectDisplayWidget({
    super.key,
    required this.projects,
    this.choice = false,
  });

  void _launchURL(String url) async {
    Uri uri = Uri.parse(url);
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      throw 'Could not launch $url';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        for (var project in projects)
          Card(
            elevation: 2,
            child: Theme(
              data: Theme.of(context).copyWith(
                dividerColor: Colors.transparent,
              ),
              child: ExpansionTile(
                title: Text(
                  project.title!,
                  style: TextStyles.body1.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppColors.accent,
                  ),
                ),
                children: [
                  Container(
                    padding: const EdgeInsets.only(left: 16.0),
                    alignment: Alignment.topLeft,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              project.description!,
                              style: TextStyles.body2,
                            ),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                if (choice == true)
                                  IconButton(
                                    icon: const Icon(Icons.edit),
                                    onPressed: () {
                                      Navigator.pushNamed(
                                        context,
                                        CreateEditProjectScreen.routeName,
                                        arguments: ProjectPreferences(
                                          projectChoice: true,
                                          projectModel: project,
                                          userId: project.userId!,
                                        ),
                                      );
                                    },
                                  ),
                                if (choice == true)
                                  IconButton(
                                    icon: const Icon(Icons.delete),
                                    onPressed: () {
                                      showDialog(
                                        context: context,
                                        builder: (BuildContext context) {
                                          return GenericDialog(
                                            title: 'Delete Confirmation',
                                            content:
                                                'Are you sure you want to delete?',
                                            onConfirm: () {
                                              BlocProvider.of<ProjectCubit>(
                                                      context)
                                                  .deleteProject(
                                                project.id!,
                                                project.userId!,
                                              );
                                              SnackBarWidget.showSnackbar(
                                                  context,
                                                  'Project deleted successfully!');
                                            },
                                            confirmButtonText: 'Delete',
                                            cancelButtonText: 'Cancel',
                                          );
                                        },
                                      );
                                    },
                                  ),
                              ],
                            ),
                          ],
                        ),
                        Wrap(
                          spacing: 8.0,
                          children: project.technologiesUsed!
                              .map((technology) => Chip(
                                    label: Text(
                                      technology,
                                      style: const TextStyle(
                                        color: Colors.black,
                                      ),
                                    ),
                                    backgroundColor: const Color.fromARGB(
                                        255, 224, 196, 229),
                                    shape: const StadiumBorder(),
                                  ))
                              .toList(),
                        ),
                        if (project.gitUrl != null &&
                            project.gitUrl!.isNotEmpty)
                          GestureDetector(
                            onTap: () => _launchURL(project.gitUrl!),
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 8.0),
                              child: Row(
                                children: [
                                  const Icon(Icons.code),
                                  const GapWidget(
                                    size: -10,
                                  ),
                                  Text(
                                    project.gitUrl!,
                                    style: const TextStyle(
                                      color: Colors.blue,
                                      decoration: TextDecoration.underline,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        if (project.demoUrl != null &&
                            project.demoUrl!.isNotEmpty)
                          GestureDetector(
                            onTap: () => _launchURL(project.demoUrl!),
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 8.0),
                              child: Row(
                                children: [
                                  const Icon(Icons.public),
                                  const GapWidget(
                                    size: -10,
                                  ),
                                  Text(
                                    project.demoUrl!,
                                    style: const TextStyle(
                                      color: Colors.blue,
                                      decoration: TextDecoration.underline,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
      ],
    );
  }
}
