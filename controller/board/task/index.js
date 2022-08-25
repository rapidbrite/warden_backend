
const controller = {
    createTask : require('./create'),
    getAllTasks : require('./getAll'),
    deleteTask : require('./delete'),
    reorderTask : require('./reorder'),
    changeStatus : require('./changeStatus'),
}



module.exports = controller;