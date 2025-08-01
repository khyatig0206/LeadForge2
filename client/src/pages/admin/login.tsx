import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isAdmin } from '@/utils/auth';
import { toast } from 'react-toastify';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Helmet, HelmetProvider } from 'react-helmet-async';

// Login form schema
const loginFormSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const AdminLogin = () => {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (isAdmin()) {
      navigate('/admin');
    }
  }, [navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

const onSubmit = async (values: LoginFormValues) => {
  setIsLoading(true);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      toast.success('Login successful');
      navigate('/admin');
    } else {
      // Handle known errors like 401/403
      toast.error(data?.message || 'Invalid username or password');
    }
  } catch (error: any) {
    toast.error(error.message || 'An unexpected error occurred.');
  } finally {
    setIsLoading(false);
  }
};




  return (
    <HelmetProvider>
  <Helmet>
    <title>Admin Login - Leadforgee</title>
  </Helmet>

    
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Leadforgee</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Admin Dashboard</p>
          </div>
          
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Sign in</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
             
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your username" 
                            {...field} 
                            autoComplete="username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter your password" 
                            {...field} 
                            autoComplete="current-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full gradient-bg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Signing in...
                      </>
                    ) : "Sign in"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <a 
                href="/" 
                className="text-sm text-primary hover:text-accent"
              >
                Back to website
              </a>
            </CardFooter>
          </Card>
          
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Forgot your password? Contact the system administrator.
            </p>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default AdminLogin;
