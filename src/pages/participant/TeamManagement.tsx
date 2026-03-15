import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTeams, Team } from '@/data/mockTeams';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Plus, Users, UserPlus, LogOut, Shield } from 'lucide-react';

const TeamManagement = () => {
  const { hackathonId } = useParams<{ hackathonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [team, setTeam] = useState<Team | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  useEffect(() => {
    // In a real app, this will fetch the current logged in user's team for this hackathon
    // Since we are mocking, if the hackathon has a team in our mock data we show it
    const existingTeam = mockTeams.find(t => t.hackathonId === hackathonId);
    if (existingTeam) {
      setTeam(existingTeam);
    }
  }, [hackathonId]);

  const handleCreateTeam = () => {
    const newTeam: Team = {
      teamId: `team-${Date.now()}`,
      hackathonId: hackathonId || '',
      teamName: 'Your New Team',
      leader: 'Current User',
      members: [
        {
          id: 'user-id-curr',
          name: 'Current User',
          email: 'current.user@example.com',
          role: 'Leader',
          avatar: "https://i.pravatar.cc/150?u=currentuser001"
        }
      ]
    };
    setTeam(newTeam);
    toast({
      title: "Team Created",
      description: "You have successfully created a team for this hackathon.",
    });
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    
    // Simulating sending an invite request
    toast({
      title: "Invite Sent",
      description: `An invitation has been sent to ${inviteEmail}.`,
    });
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

  const handleLeaveTeam = () => {
    // Simulating leaving the team
    setTeam(null);
    toast({
      title: "Left the team",
      description: "You have successfully left the team.",
    });
    navigate('/participant/dashboard');
  };

  return (
    <div className="container mx-auto px-4 pt-20 md:pt-24 pb-16 max-w-5xl">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-4xl font-bold mb-2 font-heading tracking-tight">Team Management</h1>
        <p className="text-muted-foreground text-lg">Manage your team members for this hackathon.</p>
      </div>

      {!team ? (
        <Card className="border-dashed border-2 bg-transparent/50 flex flex-col items-center justify-center p-16 text-center shadow-none transition-all hover:bg-muted/50">
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Users className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3 tracking-tight">You don't have a team yet</h2>
          <p className="text-muted-foreground mb-10 max-w-md text-base leading-relaxed">
            Create a new team to participate in this hackathon, or wait for an invitation from another team leader.
          </p>
          <Button onClick={handleCreateTeam} size="lg" className="rounded-full shadow-lg h-12 px-8 text-base">
            <Plus className="mr-2 h-5 w-5" />
            Create Team
          </Button>
        </Card>
      ) : (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* SECTION 1 - Team Info */}
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Team Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Team Name</p>
                  <p className="text-2xl font-semibold tracking-tight">{team.teamName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Team Leader</p>
                  <p className="text-xl font-medium">{team.leader}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Members</p>
                  <p className="text-xl font-medium flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    {team.members.length} / 4
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 2 - Team Members */}
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Members
                </CardTitle>
                <CardDescription className="text-base">People currently in your team.</CardDescription>
              </div>
              <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" className="hidden sm:flex rounded-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                {/* SECTION 3 - Invite Member Modal */}
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl">Invite Member</DialogTitle>
                    <DialogDescription>
                      Send an invitation email to add a new member to your team.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSendInvite}>
                    <div className="grid gap-6 py-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="member@example.com" 
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="grid gap-2 opacity-70">
                        <Label htmlFor="role" className="text-sm font-medium">Role</Label>
                        <Input 
                          id="role" 
                          value="Member"
                          disabled
                          className="bg-muted h-11"
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button type="button" variant="outline" onClick={() => setIsInviteModalOpen(false)} className="rounded-full">
                        Cancel
                      </Button>
                      <Button type="submit" className="rounded-full">Send Invite</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                <Button 
                  variant="default" 
                  className="w-full mb-6 sm:hidden rounded-full"
                  onClick={() => setIsInviteModalOpen(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Invite Member
                </Button>
                
                <div className="grid gap-4">
                  {team.members.map((member) => (
                    <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border bg-card/50 hover:bg-muted/50 transition-colors shadow-sm gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border border-border">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-base">{member.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            {member.role === 'Leader' ? <Shield className="h-3.5 w-3.5 text-primary" /> : <Users className="h-3.5 w-3.5" />}
                            {member.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SECTION 4 - Leave Team */}
          <div className="flex justify-end pt-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-white rounded-full px-6">
                  <LogOut className="mr-2 h-4 w-4" />
                  Leave Team
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-base">
                    This action cannot be undone. You will be removed from the team and no longer have access to its submissions.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLeaveTeam} className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Leave Team
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;
