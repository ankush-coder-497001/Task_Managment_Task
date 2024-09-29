import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModifyTask from "./UpdateTask";

const TaskCard = ({task,deleteTask,User})=>{

// Delete a task
const[go ,setgo] = useState(false)
const handleonMod = ()=>{
  setgo(!go)
}


  return(
    <>
            {/* <!-- Task Card 1 --> */}
            <div class="bg-white rounded-lg shadow-md overflow-hidden my-card">
                <div class="p-6">
                    <h3 class="text-xl font-bold text-primary mb-2"> {task.title} </h3>
                    <div class="flex justify-between items-center mb-4">
                        <span class="px-2 py-1 bg-blue-500 text-white text-sm rounded-full">{task.status}</span>
                        <span class="px-2 py-1 bg-red-500 text-white text-sm rounded-full">{task.priority}</span>
                    </div>
                    <p class="text-gray-600 mb-4">{task.description}</p>
                    <div class="space-y-2 text-sm">
                        <p><span class="font-semibold">{new Date(task.dueDate).toLocaleDateString()}</span></p>
                        <p><span class="font-semibold">Assigned to:</span>{task.assignedUser==null?'Not Found':task.assignedUser.name}</p>
                    </div>
                </div>
                <div class="px-6 py-4 bg-gray-100 flex justify-between">
                    {task.assignedUser.email!==User.email &&
              <><button class="text-red-500 hover:text-red-700"
                          onClick={() => deleteTask(task._id)}
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                          Delete
                      </button><button class="text-blue-500 hover:text-blue-700" onClick={handleonMod}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                              Modify
                          </button></>
}
                </div>
            </div>
{go && <ModifyTask taskId={task._id} /> }
       
    </>
  )
}

export default TaskCard;