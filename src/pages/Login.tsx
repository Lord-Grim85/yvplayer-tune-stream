
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { signInWithOTP, updateProfile } from "@/lib/supabase";

// Form validation schemas
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const mobileSchema = z.object({
  mobile: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid mobile number"),
});

type EmailForm = z.infer<typeof emailSchema>;
type MobileForm = z.infer<typeof mobileSchema>;

const Login = () => {
  const [step, setStep] = useState<'email' | 'mobile'>('email');
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Email form
  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // Mobile form
  const mobileForm = useForm<MobileForm>({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: "" },
  });

  const onEmailSubmit = async (data: EmailForm) => {
    try {
      await signInWithOTP(data.email);
      setEmail(data.email);
      toast.success('Magic link sent to your email');
      // After sending magic link, show additional instructions
      toast.info('Please check your email and click the link to continue', {
        duration: 10000,
      });
    } catch (error) {
      toast.error('Failed to send magic link');
      console.error(error);
    }
  };

  const onMobileSubmit = async (data: MobileForm) => {
    try {
      await updateProfile(data.mobile);
      navigate('/');
      toast.success('Mobile number updated successfully');
    } catch (error) {
      toast.error('Failed to update mobile number');
      console.error(error);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to YVPlayer</CardTitle>
          <CardDescription>
            {step === 'email' && "Enter your email to receive a magic link"}
            {step === 'mobile' && "Enter your mobile number to complete signup"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' && (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Magic Link
                </Button>
                <p className="text-sm text-center text-muted-foreground mt-4">
                  We'll send you a magic link to sign in instantly.
                  <br />Please check your email after submitting.
                </p>
              </form>
            </Form>
          )}

          {step === 'mobile' && (
            <Form {...mobileForm}>
              <form onSubmit={mobileForm.handleSubmit(onMobileSubmit)} className="space-y-4">
                <FormField
                  control={mobileForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Complete Signup
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
