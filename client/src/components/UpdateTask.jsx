import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const ModifyTask = ({taskId}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: '',
    priority: ''
  });


  // Fetch task data to pre-fill the form
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/SingleTask/${taskId}`);
        setTask(response.data.task);
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(taskId)
      const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, task);
      console.log('Task updated successfully', response.data);
      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task');
    }
  };

  return (
    <div className='my-form-div'>
      <form onSubmit={handleSubmit} className='my-form' >
        <label>
          Title:
          <input
          className='in'
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
          className='in'
            name="description"
            value={task.description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Due Date:
          <input
          className='in'
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Status:
          <select name="status" className='in' value={task.status} onChange={handleInputChange} required>
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>
        <label>
          Priority:
          <select name="priority" className='in' value={task.priority} onChange={handleInputChange} required>
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button type="submit" className='up-but'>Update Task</button>
      </form>
    </div>
  );
};

export default ModifyTask;
