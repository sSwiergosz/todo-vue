// handle all of requests
import axios from 'axios';

const url = 'http://localhost:5000/api/tasks/';

class TaskService {
  // get
  static getTasks() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    })
  }

  // create
  static insertTask(payload) {
    return axios.post(url, {
      name: payload.name,
      description: payload.description
    });
  }

  // delete
  static deleteTask(taskId) {
    return axios.delete(`${url}${taskId}`)
  }
}

export default TaskService;