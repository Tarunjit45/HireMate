import React, { useState } from 'react';
import { 
  Briefcase, FileText, CheckCircle, Search, MessageSquare, 
  Linkedin, Award, Sparkles, Loader2, ArrowRight
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Progress } from './components/ui/progress';
import { Badge } from './components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { ScrollArea } from './components/ui/scroll-area';

export default function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  
  // States for results
  const [optimizeResult, setOptimizeResult] = useState<any>(null);
  const [coverLetterResult, setCoverLetterResult] = useState<string>("");
  const [interviewResult, setInterviewResult] = useState<any>(null);
  const [linkedinResult, setLinkedinResult] = useState<any>(null);

  // States for loading
  const [loadingOpt, setLoadingOpt] = useState(false);
  const [loadingCl, setLoadingCl] = useState(false);
  const [loadingInt, setLoadingInt] = useState(false);
  const [loadingLi, setLoadingLi] = useState(false);

  const handleOptimize = async () => {
    if (!resumeText || !jobDescription) return alert("Please provide both Resume and Job Description");
    setLoadingOpt(true);
    try {
      const res = await fetch("/api/optimize-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription })
      });
      const data = await res.json();
      if (res.ok) setOptimizeResult(data);
      else alert("Error: " + data.error);
    } catch (e) {
      alert("Failed to analyze");
    }
    setLoadingOpt(false);
  };

  const handleCoverLetter = async () => {
    if (!resumeText || !jobDescription) return alert("Please provide both Resume and Job Description");
    setLoadingCl(true);
    try {
      const res = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription, tone: "Professional and eager" })
      });
      const data = await res.json();
      if (res.ok) setCoverLetterResult(data.coverLetter);
      else alert("Error: " + data.error);
    } catch (e) {
      alert("Failed to generate cover letter");
    }
    setLoadingCl(false);
  };

  const handleInterview = async () => {
    if (!jobDescription) return alert("Please provide Job Description");
    setLoadingInt(true);
    try {
      const res = await fetch("/api/generate-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription })
      });
      const data = await res.json();
      if (res.ok) setInterviewResult(data);
      else alert("Error: " + data.error);
    } catch (e) {
      alert("Failed to generate questions");
    }
    setLoadingInt(false);
  };

  const handleLinkedin = async () => {
    if (!resumeText) return alert("Please provide your Resume");
    setLoadingLi(true);
    try {
      const res = await fetch("/api/improve-linkedin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText })
      });
      const data = await res.json();
      if (res.ok) setLinkedinResult(data);
      else alert("Error: " + data.error);
    } catch (e) {
      alert("Failed to generate LinkedIn profile updates");
    }
    setLoadingLi(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight leading-none">HireMate</h1>
            <p className="text-xs text-slate-500 font-medium">AI Job Application Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:flex text-sm">Log in</Button>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm border-0">
            <Award className="w-4 h-4 mr-2" />
            Upgrade to Pro
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Shared Inputs */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-indigo-900">Welcome to your AI Career Coach</h3>
              <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                Paste your latest resume and the target job description. We'll use this context to generate all your application materials.
              </p>
            </div>
          </div>
          
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                Your Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Paste your current resume text here..." 
                className="min-h-[250px] text-sm resize-y"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-500" />
                Target Job Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Paste the job description you are applying for..." 
                className="min-h-[250px] text-sm resize-y"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: AI Tools */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="optimize" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 mb-6 bg-slate-100/50 border border-slate-200">
              <TabsTrigger value="optimize" className="py-2.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                ATS Match
              </TabsTrigger>
              <TabsTrigger value="cover-letter" className="py-2.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Cover Letter
              </TabsTrigger>
              <TabsTrigger value="interview" className="py-2.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Interview Prep
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="py-2.5 text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
                LinkedIn
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: ATS SCORE */}
            <TabsContent value="optimize" className="m-0 focus-visible:outline-none">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>ATS Resume Optimization</CardTitle>
                  <CardDescription>Get a match score and see exactly what keywords your resume is missing.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!optimizeResult ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                      <CheckCircle className="w-12 h-12 mb-4 text-slate-300" />
                      <p className="text-sm max-w-sm">We'll compare your resume to the job description to find missing keywords and weak bullet points.</p>
                      <Button onClick={handleOptimize} disabled={loadingOpt} className="mt-6">
                        {loadingOpt ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        Analyze Resume Match
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-full border-8 border-indigo-100 flex items-center justify-center relative bg-indigo-50/50 shadow-sm">
                           <span className="text-3xl font-bold text-indigo-700">{optimizeResult.score}</span>
                           <div className="absolute inset-0 rounded-full border-8 border-indigo-600 opacity-20" style={{ clipPath: `inset(${100 - optimizeResult.score}% 0 0 0)` }}></div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">Optimization Score</h3>
                          <p className="text-sm text-slate-500 mt-1">A score above 80 greatly increases your chances of passing ATS filters.</p>
                          <Progress value={optimizeResult.score} className="h-2 mt-4" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Key Strengths</h4>
                          <ul className="space-y-2">
                            {optimizeResult.strengths.map((str: string, i: number) => (
                              <li key={i} className="text-sm bg-green-50 text-green-800 px-3 py-2 rounded-md border border-green-100">{str}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium flex items-center gap-2"><FileText className="w-4 h-4 text-amber-600" /> Missing Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {optimizeResult.missingKeywords.map((kw: string, i: number) => (
                              <Badge key={i} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">{kw}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-slate-100">
                        <h4 className="font-medium">Rewrite Suggestions</h4>
                        <Accordion type="single" collapsible className="w-full">
                          {optimizeResult.rewrites.map((rw: any, i: number) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                              <AccordionTrigger className="text-sm text-left hover:no-underline hover:text-indigo-600 transition-colors">
                                {rw.original.substring(0, 70)}...
                              </AccordionTrigger>
                              <AccordionContent>
                                <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                                  <div>
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Original</span>
                                    <p className="text-sm text-slate-700 mt-1">{rw.original}</p>
                                  </div>
                                  <div>
                                    <span className="text-xs font-semibold text-indigo-500 uppercase">Suggested</span>
                                    <p className="text-sm font-medium text-slate-900 mt-1">{rw.suggested}</p>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button variant="outline" onClick={() => setOptimizeResult(null)}>Recalculate</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: COVER LETTER */}
            <TabsContent value="cover-letter" className="m-0 focus-visible:outline-none">
               <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>AI Cover Letter Generator</CardTitle>
                  <CardDescription>Generate a tailored, high-converting cover letter based on your resume and the job.</CardDescription>
                </CardHeader>
                <CardContent>
                  {!coverLetterResult ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                      <FileText className="w-12 h-12 mb-4 text-slate-300" />
                      <p className="text-sm max-w-sm">Ditch the generic templates. We'll write a personalized cover letter that highlights why you're exactly what they need.</p>
                      <Button onClick={handleCoverLetter} disabled={loadingCl} className="mt-6">
                        {loadingCl ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        Generate Cover Letter
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                       <div className="relative">
                          <Textarea 
                            className="min-h-[400px] leading-relaxed text-sm p-6 bg-slate-50 resize-y rounded-xl border-slate-200" 
                            defaultValue={coverLetterResult}
                          />
                          <Button 
                            size="sm" 
                            className="absolute top-4 right-4 shadow-sm"
                            onClick={() => { navigator.clipboard.writeText(coverLetterResult); alert("Copied to clipboard!"); }}
                          >
                            Copy Text
                          </Button>
                       </div>
                       <div className="flex justify-between items-center pt-2">
                         <span className="text-xs text-slate-500">Tip: Always proofread and add your personal touch before submitting.</span>
                         <Button variant="outline" onClick={handleCoverLetter} disabled={loadingCl}>
                           {loadingCl ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                           Regenerate
                         </Button>
                       </div>
                    </div>
                  )}
                </CardContent>
               </Card>
            </TabsContent>

            {/* TAB 3: INTERVIEW PREP */}
            <TabsContent value="interview" className="m-0 focus-visible:outline-none">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Interview Predictor</CardTitle>
                  <CardDescription>Practice with behavioral and technical questions tailored specifically to this role.</CardDescription>
                </CardHeader>
                <CardContent>
                  {!interviewResult ? (
                     <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                      <MessageSquare className="w-12 h-12 mb-4 text-slate-300" />
                      <p className="text-sm max-w-sm">We'll analyze the job description to predict what the hiring manager will ask you.</p>
                      <Button onClick={handleInterview} disabled={loadingInt} className="mt-6">
                        {loadingInt ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        Generate Questions
                      </Button>
                    </div>
                  ) : (
                     <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                        <div>
                          <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><Users className="w-4 h-4 text-blue-600" /> Behavioral & Cultural Questions</h3>
                          <Accordion type="multiple" className="w-full">
                            {interviewResult.behavioral.map((b: any, i: number) => (
                               <AccordionItem key={i} value={`beh-${i}`}>
                                <AccordionTrigger className="text-sm font-medium hover:no-underline text-left leading-relaxed">
                                  {b.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 text-sm text-slate-700">
                                    <strong className="text-blue-800 block mb-1">Ideal Approach:</strong>
                                    {b.approach}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                        
                        <div className="pt-2 border-t border-slate-100">
                          <h3 className="font-semibold text-base mb-4 flex items-center gap-2"><Award className="w-4 h-4 text-purple-600" /> Technical / Role-Specific Questions</h3>
                          <Accordion type="multiple" className="w-full">
                            {interviewResult.technical.map((t: any, i: number) => (
                               <AccordionItem key={i} value={`tech-${i}`}>
                                <AccordionTrigger className="text-sm font-medium hover:no-underline text-left leading-relaxed">
                                  {t.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="p-4 bg-purple-50/50 rounded-lg border border-purple-100 text-sm text-slate-700">
                                    <strong className="text-purple-800 block mb-1">Ideal Approach:</strong>
                                    {t.approach}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                     </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 4: LINKEDIN */}
            <TabsContent value="linkedin" className="m-0 focus-visible:outline-none">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>LinkedIn Makeover</CardTitle>
                  <CardDescription>Optimize your LinkedIn profile to attract recruiters and align with your resume.</CardDescription>
                </CardHeader>
                <CardContent>
                   {!linkedinResult ? (
                     <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                      <Linkedin className="w-12 h-12 mb-4 text-slate-300" />
                      <p className="text-sm max-w-sm">Turn your resume into a compelling LinkedIn headline and About section that stands out.</p>
                      <Button onClick={handleLinkedin} disabled={loadingLi} className="mt-6">
                        {loadingLi ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        Optimize LinkedIn
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                      <div>
                        <h3 className="font-semibold text-sm text-slate-500 uppercase mb-3">Headline Options</h3>
                        <div className="space-y-3">
                          {linkedinResult.headlines.map((hl: string, i: number) => (
                            <div key={i} className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm flex justify-between items-center gap-4">
                              <p className="font-medium text-slate-900 text-sm">{hl}</p>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="shrink-0"
                                onClick={() => { navigator.clipboard.writeText(hl); alert("Copied!"); }}
                              >
                                Copy
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <h3 className="font-semibold text-sm text-slate-500 uppercase mb-3 text-left">About Summary</h3>
                        <div className="relative">
                          <Textarea 
                            className="min-h-[250px] leading-relaxed text-sm p-4 bg-slate-50 resize-y rounded-xl border-slate-200" 
                            defaultValue={linkedinResult.summary}
                          />
                           <Button 
                            size="sm" 
                            className="absolute top-3 right-3 shadow-sm"
                            onClick={() => { navigator.clipboard.writeText(linkedinResult.summary); alert("Copied!"); }}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </main>

      <footer className="bg-slate-900 border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-6 text-center lg:text-left flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold tracking-tight text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <Briefcase className="w-5 h-5 text-indigo-400" />
              HireMate
            </h2>
            <p className="text-xs text-slate-400 font-medium">Your AI Job Application Assistant.</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Pricing</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

const Users = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

