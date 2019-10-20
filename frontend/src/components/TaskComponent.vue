<template>
  <div>
    {{ tasks }}
  </div>
</template>

<script> 
import TaskService from '../TaskService';
export default {
  name: 'TaskComponent',
  data() {
    return {
      tasks: [],
      error: '',
      name: ''
    }
  },
  async created() {
    try {
      this.tasks = await TaskService.getTasks();
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
