import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { UserPlus, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agreeToTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    const res = await dispatch(register(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Registration successful!");
      navigate("/");
    } else {
      toast.error(res.payload || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <Card className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <UserPlus className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Join TaskManager today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="w-full pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={form.agreeToTerms}
                  onCheckedChange={(checked) => handleChange({ target: { name: "agreeToTerms", type: "checkbox", checked } })}
                  required
                />
                <Label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{" "}
                  <a href="#terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms</a> and{" "}
                  <a href="#privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full flex justify-center items-center py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Registering...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Create Account</span>
                  </div>
                )}
              </Button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  Sign in
                </Link>
              </div>

              {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
