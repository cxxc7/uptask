import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/slices/taskSlice";
import { setFilter } from "../redux/slices/uiSlice";
import { Link } from "react-router-dom";

import { 
  Plus, 
  CheckSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Edit 
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const statusTabs = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
    case "medium":
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
    case "low":
    default:
      return "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300";
    case "pending":
    default:
      return "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300";
  }
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { filter } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchTasks(filter === "all" ? "" : filter));
  }, [dispatch, filter]);

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    highPriority: tasks.filter((t) => t.priority === "high").length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your tasks efficiently</p>
          </div>
          <Link to="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Task</span>
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="inline-flex gap-4 justify-center items-stretch w-full overflow-x-auto pb-2">
          {/* Each stat card will be forced to same width and bold box style */}
          {[
            {
              label: "Total Tasks",
              value: taskStats.total,
              icon: <CheckSquare className="h-6 w-6 text-blue-600" />,
              color: "bg-blue-100 dark:bg-blue-900/30",
            },
            {
              label: "Completed",
              value: taskStats.completed,
              icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
              color: "bg-emerald-100 dark:bg-emerald-900/30",
            },
            {
              label: "Pending",
              value: taskStats.pending,
              icon: <Clock className="h-6 w-6 text-amber-600" />,
              color: "bg-amber-100 dark:bg-amber-900/30",
            },
            {
              label: "High Priority",
              value: taskStats.highPriority,
              icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
              color: "bg-red-100 dark:bg-red-900/30",
            },
          ].map((stat, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs and Tasks */}
        <Card className="bg-white dark:bg-gray-800 border">
          <Tabs value={filter} onValueChange={(val) => dispatch(setFilter(val))}>
            <div className="border-b px-6 py-2">
              <TabsList className="grid grid-cols-3 max-w-sm">
                {statusTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={filter} className="p-6">
              {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-center text-red-500">{error}</p>
              ) : tasks.length === 0 ? (
                <p className="text-center text-gray-500">No tasks found.</p>
              ) : (
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {tasks.map((task) => (
                    <Card key={task._id} className="bg-gray-50 dark:bg-gray-700/50 border hover:shadow-md transition">
                      <CardContent className="p-6 space-y-3">
                        <div className="flex justify-between">
                          <div className="flex flex-wrap gap-1">
                            <Badge className={`${getPriorityColor(task.priority)} text-xs`}>
                              {task.priority?.toUpperCase()}
                            </Badge>
                            <Badge className={`${getStatusColor(task.status)} text-xs`}>
                              {task.status?.toUpperCase()}
                            </Badge>
                          </div>
                          <Link to={`/edit/${task._id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {task.description}
                        </p>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between">
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : ""}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
