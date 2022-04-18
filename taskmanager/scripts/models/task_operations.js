import Task from './Task.js';

const taskOperations = {
    tasks: [],
    
    add(id, name, desc, date, url){
        let task = new Task(id, name, desc, date, url);

        this.tasks.push(task);
        console.log('Task added: ', task);
        return task;
    },

    remove(id){
        this.tasks = this.tasks.filter(task => task.id != id);
        console.log('Task removed: ', id);
    },

    isTask(id){
        return this.tasks.find(task => task.id == id);
    },

    getTaskById(id){
        let task = this.tasks.find(task => task.id == id);

        return task;
    },

    getAllTasks(){
        return this.tasks;
    },

    mark(id){
        let task = this.tasks.find(task => task.id == id);
        if(task){
            task.isMarked = !task.isMarked; 
        }   // task.toggle();
    },

    countMarked(){
        return this.tasks.filter((task) => !task.isMarked).length;
    },

    countUnmarked(){
        console.log( this.tasks.length, this.countMarked() );
        return this.tasks.length - this.countMarked();
    },

    deletedMarked(){
        this.tasks = this.tasks.filter((task) => !task.isMarked);   
        return this.tasks;
    }
}

export default taskOperations;