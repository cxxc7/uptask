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
  Edit,
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

// Badge background/text color logic
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

  const handleLogout = () => {
    // Clear any auth tokens or user state here if needed
    window.location.href = '/logout';
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
      <div className="space-y-6">
        {/* Top Bar: Add Task left, Logout right */}
        <div className="flex items-center justify-between mb-4 w-full">
          <Link to="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Task</span>
            </Button>
          </Link>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">Logout</Button>
        </div>

        {/* Stats */}
        {/* Stats */}
        <div className="inline-flex gap-4 justify-center items-stretch w-full overflow-x-auto pb-2">
          {[
            {
              label: "Total Tasks",
              value: taskStats.total,
              icon: <CheckSquare className="h-7 w-7 text-blue-600" />,
              color: "bg-blue-200"
            },
            {
              label: "Completed",
              value: taskStats.completed,
              icon: <CheckCircle className="h-7 w-7 text-emerald-600" />,
              color: "bg-emerald-200"
            },
            {
              label: "Pending",
              value: taskStats.pending,
              icon: <Clock className="h-7 w-7 text-amber-600" />,
              color: "bg-amber-200"
            },
            {
              label: "High Priority",
              value: taskStats.highPriority,
              icon: <AlertTriangle className="h-7 w-7 text-red-600" />,
              color: "bg-red-200"
            }
          ].map((stat, index) => (
            <Card
              key={index}
              className={`border border-gray-200 rounded-xl shadow-sm flex flex-col justify-center items-center py-5 px-3 bg-white w-full`}
            >
              <CardContent className="flex flex-col items-center gap-2">
                <div className={`rounded-full flex items-center justify-center w-14 h-14 mb-2 ${stat.color}`}>
                  {(() => {
                    switch (stat.label) {
                      case "Total Tasks":
                        return <CheckSquare className="h-7 w-7 text-blue-600 bg-transparent" />;
                      case "Completed":
                        return <CheckCircle className="h-7 w-7 text-emerald-600 bg-transparent" />;
                      case "Pending":
                        return <Clock className="h-7 w-7 text-amber-600 bg-transparent" />;
                      case "High Priority":
                        return <AlertTriangle className="h-7 w-7 text-red-600 bg-transparent" />;
                      default:
                        return stat.icon;
                    }
                  })()}
                </div>
                <p className="text-base font-medium text-gray-600 text-center">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 text-center">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs and Task Cards */}
        <Card className="bg-[var(--card)] dark:bg-gray-800 border w-full">
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
              {(() => {
                if (loading) {
                  return <p className="text-center text-gray-500">Loading...</p>;
                }
                if (error) {
                  return <p className="text-center text-red-500">{error}</p>;
                }
                if (tasks.length === 0) {
                  return (
                    <p className="text-center text-gray-500">No tasks found.</p>
                  );
                }
                return (
                  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {tasks.map((task) => (
                      <Card
                        key={task._id}
                        className="bg-[var(--card)] rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition w-full"
                      >
                        <CardContent className="p-4 space-y-4">
                          {/* Edit Button */}
                          <div className="flex justify-end">
                            <Link to={`/edit/${task._id}`} title="Edit Task">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-blue-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>

                          {/* Info Section */}
                          <div className="space-y-3 text-sm text-gray-700">
                            {[
                              ["Title", task.title],
                              ["Description", task.description],
                              [
                                "Created on",
                                task.createdAt
                                  ? new Date(task.createdAt).toLocaleString(undefined, {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      second: "numeric",
                                      hour12: true,
                                    })
                                  : "N/A",
                              ],
                            ].map(([label, value], idx) => (
                              <div key={idx} className="flex items-start gap-x-2">
                                <span className="font-bold text-gray-800">{label}:</span>
                                <span className="font-normal text-gray-700">{value}</span>
                              </div>
                            ))}

                            {/* Status */}
                            <div className="flex items-center gap-x-2">
                              <span className="font-bold text-gray-800">Status:</span>
                              <Badge
                                className={`${getStatusColor(
                                  task.status
                                )} text-sm px-3 py-1 font-normal rounded-full shadow-sm`}
                              >
                                {task.status?.toUpperCase()}
                              </Badge>
                            </div>

                            {/* Priority */}
                            <div className="flex items-center gap-x-2">
                              <span className="font-bold text-gray-800">Priority:</span>
                              <Badge
                                className={`${getPriorityColor(
                                  task.priority
                                )} text-sm px-3 py-1 font-normal rounded-full shadow-sm`}
                              >
                                {task.priority?.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                );
              })()}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
