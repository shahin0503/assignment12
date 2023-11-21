import 'package:assignment12_front_end/core/api.dart';
import 'package:assignment12_front_end/data/models/project/project_model.dart';
import 'package:dio/dio.dart';

class ProjectRepository {
  final _api = Api();

  Future<List<ProjectModel>> fetchProjectByUser(String userId) async {
    try {
      Response response = await _api.sendRequest.get('/project/$userId');

      ApiResponse apiResponse = ApiResponse.fromResponse(response);

      if (!apiResponse.success) {
        throw apiResponse.message.toString();
      }
      return (apiResponse.data as List<dynamic>)
          .map((json) => ProjectModel.fromJson(json))
          .toList();
    } catch (error) {
      rethrow;
    }
  }
}
