import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, FileText, Github, ExternalLink, Presentation, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { mockSubmissions } from '@/data/mockSubmissions';
import { mockHackathons } from '@/data/mockHackathons';

const SubmitProject = () => {
  const { hackathonId } = useParams<{ hackathonId: string }>();
  const { toast } = useToast();
  const hackathon = mockHackathons.find((h) => h.id === hackathonId);

  // Check if already submitted
  const existingSubmission = mockSubmissions.find(
    (s) => s.hackathonId === hackathonId
  );

  const [isSubmitted, setIsSubmitted] = useState(!!existingSubmission);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    projectName: existingSubmission?.projectName || '',
    description: existingSubmission?.description || '',
    githubUrl: existingSubmission?.githubUrl || '',
    liveDemoUrl: existingSubmission?.liveDemoUrl || '',
    presentationLink: existingSubmission?.presentationLink || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.projectName || !form.description || !form.githubUrl) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: '🎉 Project Submitted!',
      description: 'Your project has been submitted successfully for evaluation.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        {/* Back link */}
        <Link
          to={`/participant/dashboard`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        {/* Page Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 border-b border-border/50 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-heading tracking-tight">Submit Project</h1>
              <p className="text-muted-foreground">Submit your project for evaluation.</p>
            </div>
          </div>
          {hackathon && (
            <Badge variant="outline" className="mt-2 text-sm px-3 py-1">
              {hackathon.title}
            </Badge>
          )}
        </motion.div>

        {/* Submission Status */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className={`mb-8 border ${isSubmitted ? 'border-primary/30 bg-primary/5' : 'border-border/50'}`}>
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isSubmitted ? 'bg-primary/20' : 'bg-muted'}`}>
                {isSubmitted ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <FileText className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-heading font-semibold text-sm">Submission Status</p>
                <p className={`text-sm ${isSubmitted ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                  {isSubmitted ? '✓ Submitted — Your project is under review.' : 'Not Submitted — Fill and submit the form below.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submission Form */}
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-border/50 shadow-md">
                <CardHeader className="text-center pb-2 pt-10">
                  <div className="mx-auto h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-heading">Project Submitted Successfully!</CardTitle>
                  <CardDescription className="text-base mt-2 max-w-md mx-auto">
                    Your project <span className="text-foreground font-medium">"{form.projectName}"</span> has been submitted. You'll receive a notification once it's reviewed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 pb-10">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                      <Github className="h-4 w-4 text-muted-foreground shrink-0" />
                      <a href={form.githubUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline truncate">
                        {form.githubUrl}
                      </a>
                    </div>
                    {form.liveDemoUrl && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                        <a href={form.liveDemoUrl} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline truncate">
                          {form.liveDemoUrl}
                        </a>
                      </div>
                    )}
                    {form.presentationLink && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                        <Presentation className="h-4 w-4 text-muted-foreground shrink-0" />
                        <a href={form.presentationLink} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline truncate">
                          {form.presentationLink}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center mt-8">
                    <Button variant="outline" className="rounded-full" onClick={() => setIsSubmitted(false)}>
                      Edit Submission
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <Card className="border-border/50 shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl font-heading flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Submission Form
                  </CardTitle>
                  <CardDescription>Fill in the details of your final project.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Name */}
                    <div className="space-y-2">
                      <Label htmlFor="projectName" className="text-sm font-medium">
                        Project Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="projectName"
                        name="projectName"
                        placeholder="e.g. AI Health Predictor"
                        value={form.projectName}
                        onChange={handleChange}
                        className="h-11"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe what your project does, the problem it solves, and the technologies used…"
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                        className="resize-none"
                        required
                      />
                    </div>

                    {/* Github URL */}
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl" className="text-sm font-medium flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub Repository URL <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="githubUrl"
                        name="githubUrl"
                        type="url"
                        placeholder="https://github.com/your-org/your-project"
                        value={form.githubUrl}
                        onChange={handleChange}
                        className="h-11"
                        required
                      />
                    </div>

                    {/* Live Demo URL */}
                    <div className="space-y-2">
                      <Label htmlFor="liveDemoUrl" className="text-sm font-medium flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo URL
                      </Label>
                      <Input
                        id="liveDemoUrl"
                        name="liveDemoUrl"
                        type="url"
                        placeholder="https://your-project.vercel.app"
                        value={form.liveDemoUrl}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>

                    {/* Presentation Link */}
                    <div className="space-y-2">
                      <Label htmlFor="presentationLink" className="text-sm font-medium flex items-center gap-2">
                        <Presentation className="h-4 w-4" />
                        Presentation Link
                      </Label>
                      <Input
                        id="presentationLink"
                        name="presentationLink"
                        type="url"
                        placeholder="https://docs.google.com/presentation/d/..."
                        value={form.presentationLink}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-border/50">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-12 rounded-full font-bold text-base shadow-[0_0_15px_rgba(216,245,36,0.15)] hover:shadow-[0_0_25px_rgba(216,245,36,0.3)] transition-all"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Submit Project
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitProject;
