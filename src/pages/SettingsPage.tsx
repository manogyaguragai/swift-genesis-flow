
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Save, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveUserSettings, resetPassword } from '../services/api';
import { useAuthStore } from '../store/authStore';

const settingsSchema = z.object({
  phase1_ranking_number: z.number().min(1).max(30, 'Maximum 30 candidates allowed'),
  phase2_ranking_number: z.number().min(1).max(20, 'Maximum 20 candidates allowed'),
  number_of_questions_to_generate: z.number().min(1).max(20, 'Maximum 20 questions allowed'),
});

const passwordSchema = z.object({
  old_password: z.string().min(1, 'Current password is required'),
  new_password: z.string().min(8, 'New password must be at least 8 characters'),
  confirm_password: z.string().min(1, 'Please confirm your new password'),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

type SettingsFormData = z.infer<typeof settingsSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const settingsForm = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      phase1_ranking_number: 20,
      phase2_ranking_number: 10,
      number_of_questions_to_generate: 10,
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSettingsSubmit = async (data: SettingsFormData) => {
    if (!user?.userId) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await saveUserSettings({
        user_id: user.userId,
        phase1_ranking_number: data.phase1_ranking_number,
        phase2_ranking_number: data.phase2_ranking_number,
        number_of_questions_to_generate: data.number_of_questions_to_generate,
      });

      toast({
        title: "Settings Saved",
        description: response.message,
        className: "bg-green-50 border-green-200 text-green-800",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "User email not available",
        variant: "destructive",
      });
      return;
    }

    setIsPasswordLoading(true);
    try {
      const response = await resetPassword({
        email: user.email,
        old_password: data.old_password,
        new_password: data.new_password,
      });

      toast({
        title: "Success",
        description: response.message,
        className: "bg-green-50 border-green-200 text-green-800",
      });

      // Reset the form
      passwordForm.reset();
    } catch (error: any) {
      toast({
        title: "Password Reset Failed",
        description: error.message || "Failed to reset password",
        variant: "destructive",
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-inter text-slate-900 mb-4">Settings</h1>
          <p className="text-lg text-slate-600 font-ibm">Configure your preferences and account settings</p>
        </div>

        {/* Two Panes Side by Side */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Settings Card */}
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-glass border border-white/30 p-8 hover:bg-white/25 transition-all duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-inter text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Save className="w-5 h-5 text-white" />
                </div>
                Ranking & Question Settings
              </h2>
              <p className="text-slate-600 font-ibm">Configure your default ranking and question generation preferences</p>
            </div>

            <TooltipProvider>
              <Form {...settingsForm}>
                <form onSubmit={settingsForm.handleSubmit(onSettingsSubmit)} className="space-y-6">
                  <FormField
                    control={settingsForm.control}
                    name="phase1_ranking_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-3 text-slate-900 font-semibold text-base">
                          Initial Ranking Top K Number (Max: 30)
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center cursor-help transition-colors">
                                <Info className="w-3 h-3 text-slate-600" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Our AI uses 2 phases for ranking. Among the total resumes you give, set the number of candidates you want to pick up in the first run.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter number (1-30)"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              const numValue = value === '' ? 0 : parseInt(value);
                              field.onChange(Math.min(Math.max(numValue, 0), 30));
                            }}
                            value={field.value || ''}
                            className="bg-white/60 backdrop-blur-sm border-white/40 focus:border-primary/50 focus:bg-white/80 transition-all duration-300 text-base py-3"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={settingsForm.control}
                    name="phase2_ranking_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-3 text-slate-900 font-semibold text-base">
                          Final Ranking Top K Number (Max: 20)
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center cursor-help transition-colors">
                                <Info className="w-3 h-3 text-slate-600" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Our AI uses 2 phases for ranking. Among the candidates selected in the first screening, set the number of final candidates you want to select.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter number (1-20)"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              const numValue = value === '' ? 0 : parseInt(value);
                              field.onChange(Math.min(Math.max(numValue, 0), 20));
                            }}
                            value={field.value || ''}
                            className="bg-white/60 backdrop-blur-sm border-white/40 focus:border-primary/50 focus:bg-white/80 transition-all duration-300 text-base py-3"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={settingsForm.control}
                    name="number_of_questions_to_generate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-3 text-slate-900 font-semibold text-base">
                          Default Number of Questions to Generate (Max: 20)
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center cursor-help transition-colors">
                                <Info className="w-3 h-3 text-slate-600" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Set the default number of questions to generate.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter number (1-20)"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              const numValue = value === '' ? 0 : parseInt(value);
                              field.onChange(Math.min(Math.max(numValue, 0), 20));
                            }}
                            value={field.value || ''}
                            className="bg-white/60 backdrop-blur-sm border-white/40 focus:border-primary/50 focus:bg-white/80 transition-all duration-300 text-base py-3"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-glow-blue hover:shadow-glow-purple transform hover:scale-[1.02]"
                  >
                    <Save className="w-5 h-5 mr-3" />
                    {isLoading ? 'Saving Settings...' : 'Save Settings'}
                  </Button>
                </form>
              </Form>
            </TooltipProvider>
          </div>

          {/* Password Reset Card */}
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-glass border border-white/30 p-8 hover:bg-white/25 transition-all duration-300">
            <div className="mb-8">
              <h2 className="text-2xl font-bold font-inter text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-white" />
                </div>
                Password Settings
              </h2>
              <p className="text-slate-600 font-ibm">Update your account password for enhanced security</p>
            </div>

            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 font-semibold text-base">Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your current password"
                          {...field}
                          className="bg-white/60 backdrop-blur-sm border-white/40 focus:border-primary/50 focus:bg-white/80 transition-all duration-300 text-base py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 font-semibold text-base">New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password (min 8 characters)"
                          {...field}
                          className="bg-white/60 backdrop-blur-sm border-white/40 focus:border-primary/50 focus:bg-white/80 transition-all duration-300 text-base py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 font-semibold text-base">Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          {...field}
                          className="bg-white/60 backdrop-blur-sm border-white/40 focus:border-primary/50 focus:bg-white/80 transition-all duration-300 text-base py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPasswordLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-glow-blue hover:shadow-glow-purple transform hover:scale-[1.02]"
                >
                  <KeyRound className="w-5 h-5 mr-3" />
                  {isPasswordLoading ? 'Updating Password...' : 'Update Password'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
