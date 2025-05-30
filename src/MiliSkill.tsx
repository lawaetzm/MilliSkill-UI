import { useState } from 'react';
import { Users, Target, Shield, Award, BookOpen, MessageCircle, User, Search, Bell, TrendingUp, AlertTriangle, Calendar, BarChart3, Activity, Clock, ChevronRight, Filter, Download } from 'lucide-react';

interface Module {
  id: number;
  name: string;
  score?: number;
  progress?: number;
  instructor: string;
}

interface ModuleDetailProps {
  module: Module;
  type: 'completed' | 'active';
}

interface ModuleListProps {
  modules: Module[];
  type: 'completed' | 'active';
  title: string;
}

const MiliSkill = () => {
  const [activeRole, setActiveRole] = useState('recruit');
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const moduleData = {
    completed: [
      { id: 1, name: "Grundlæggende Militær Træning", score: 92, instructor: "Sgt. Larsen" },
      { id: 2, name: "Førstehjælp Niveau 1", score: 88, instructor: "Korporal Nielsen" },
      { id: 3, name: "Våbenhåndtering Basis", score: 95, instructor: "Sgt. Hansen" }
    ] as Module[],
    active: [
      { id: 4, name: "Køretøjsføring Niveau 2", progress: 78, instructor: "Sgt. Petersen" },
      { id: 5, name: "Taktik & Strategi", progress: 45, instructor: "Løjtnant Skov" },
      { id: 6, name: "Teamwork & Ledelse", progress: 23, instructor: "Kaptajn Berg" }
    ] as Module[]
  };

  const ModuleDetail = ({ module, type }: ModuleDetailProps) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <button 
        onClick={() => setCurrentView('dashboard')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Tilbage til Dashboard
      </button>
      
      <h2 className="text-2xl font-bold mb-4">{module.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">
            {type === 'completed' ? 'Resultat' : 'Fremgang'}
          </h3>
          <div className="text-2xl font-bold text-blue-600">
            {type === 'completed' ? `${module.score}%` : `${module.progress}%`}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Instruktør</h3>
          <p>{module.instructor}</p>
        </div>
      </div>
      
      {type === 'active' && (
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Fortsæt Træning
        </button>
      )}
    </div>
  );

  const ModuleList = ({ modules, type, title }: ModuleListProps) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <button 
        onClick={() => setCurrentView('dashboard')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Tilbage til Dashboard
      </button>
      
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <div className="space-y-3">
        {modules.map((module: Module) => (
          <div 
            key={module.id}
            onClick={() => {
              setSelectedModule(module);
              setCurrentView('module-detail');
            }}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{module.name}</h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {type === 'completed' ? `${module.score}%` : `${module.progress}%`}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Instruktør: {module.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const RecruitDashboard = () => {
    // Wellness and burnout data
    const wellnessData = {
      overall: 78,
      stress: 35,
      workLifeBalance: 82,
      motivation: 88,
      physicalHealth: 91,
      mentalHealth: 74,
      sleepQuality: 67,
      socialConnection: 85
    };

    const burnoutIndicators = {
      emotional: 25, // Lower is better for burnout indicators
      physical: 30,
      mental: 20,
      overall: 25
    };

    const recentMood = [
      { date: "Ma", mood: 8, energy: 7 },
      { date: "Ti", mood: 6, energy: 6 },
      { date: "On", mood: 7, energy: 8 },
      { date: "To", mood: 9, energy: 9 },
      { date: "Fr", mood: 8, energy: 7 },
      { date: "Lø", mood: 9, energy: 8 },
      { date: "Sø", mood: 7, energy: 6 }
    ];

    // Circular progress component
    const CircularProgress = ({ value, size = 80, strokeWidth = 8, color = "#3B82F6" }: { value: number, size?: number, strokeWidth?: number, color?: string }) => {
      const radius = (size - strokeWidth) / 2;
      const circumference = radius * 2 * Math.PI;
      const strokeDasharray = circumference;
      const strokeDashoffset = circumference - (value / 100) * circumference;
      
      return (
        <div className="relative inline-flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out"
            />
          </svg>
          <span className="absolute text-sm font-bold">{value}%</span>
        </div>
      );
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="mr-2 text-blue-600" size={20} />
              Min Uddannelsesplan
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Samlet Fremgang</span>
                <span className="font-semibold">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{width: '65%'}}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button 
                  onClick={() => setCurrentView('completed-modules')}
                  className="bg-green-50 p-4 rounded-lg hover:bg-green-100"
                >
                  <div className="flex items-center justify-between">
                    <Award className="text-green-600" size={24} />
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Gennemførte Moduler</p>
                </button>
                
                <button 
                  onClick={() => setCurrentView('active-modules')}
                  className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100"
                >
                  <div className="flex items-center justify-between">
                    <BookOpen className="text-orange-600" size={24} />
                    <span className="text-2xl font-bold text-orange-600">3</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Aktive Moduler</p>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Activity className="mr-2 text-green-600" size={20} />
              Trivsel & Velbefindende
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <CircularProgress value={wellnessData.overall} color="#10B981" />
                <p className="text-sm font-medium mt-2 text-gray-700">Samlet Trivsel</p>
              </div>
              <div className="text-center">
                <CircularProgress value={wellnessData.motivation} color="#3B82F6" />
                <p className="text-sm font-medium mt-2 text-gray-700">Motivation</p>
              </div>
              <div className="text-center">
                <CircularProgress value={wellnessData.workLifeBalance} color="#8B5CF6" />
                <p className="text-sm font-medium mt-2 text-gray-700">Work-Life Balance</p>
              </div>
              <div className="text-center">
                <CircularProgress value={wellnessData.physicalHealth} color="#F59E0B" />
                <p className="text-sm font-medium mt-2 text-gray-700">Fysisk Sundhed</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Stress Niveau</span>
                <span className={`text-sm font-bold ${wellnessData.stress < 40 ? 'text-green-600' : wellnessData.stress < 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {wellnessData.stress < 40 ? 'Lavt' : wellnessData.stress < 70 ? 'Moderat' : 'Højt'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-300 ${
                    wellnessData.stress < 40 ? 'bg-green-500' : 
                    wellnessData.stress < 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{width: `${wellnessData.stress}%`}}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Aktuelt Forløb</h3>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900">Køretøjsføring Niveau 2</h4>
              <p className="text-blue-700 text-sm mt-1">Tunge køretøjer og specialudstyr</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-blue-600">Fremgang: 78%</span>
                <button 
                  onClick={() => {
                    setSelectedModule(moduleData.active[0]);
                    setCurrentView('module-detail');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                >
                  Fortsæt Træning
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Stemning & Energi (Seneste 7 dage)</h3>
            <div className="grid grid-cols-7 gap-2">
              {recentMood.map((day, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-gray-600 mb-2">{day.date}</p>
                  <div className="space-y-1">
                    <div className="bg-gray-200 rounded-full h-16 w-8 mx-auto relative">
                      <div 
                        className="bg-blue-500 rounded-full absolute bottom-0 w-full transition-all duration-300"
                        style={{height: `${(day.mood / 10) * 100}%`}}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-blue-600">{day.mood}/10</p>
                    <div className="bg-gray-200 rounded-full h-16 w-8 mx-auto relative">
                      <div 
                        className="bg-green-500 rounded-full absolute bottom-0 w-full transition-all duration-300"
                        style={{height: `${(day.energy / 10) * 100}%`}}
                      ></div>
                    </div>
                    <p className="text-xs font-medium text-green-600">{day.energy}/10</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Stemning</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Energi</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Sundhedsmetrik</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Søvnkvalitet</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: `${wellnessData.sleepQuality}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{wellnessData.sleepQuality}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Mental Sundhed</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: `${wellnessData.mentalHealth}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{wellnessData.mentalHealth}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Social Forbindelse</span>
                <div className="flex items-center">
                  <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-pink-500 h-2 rounded-full" style={{width: `${wellnessData.socialConnection}%`}}></div>
                  </div>
                  <span className="text-sm font-medium">{wellnessData.socialConnection}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MessageCircle className="mr-2 text-green-600" size={20} />
              MiliLife Chat
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-green-50 hover:bg-green-100 p-3 rounded-lg text-left">
                <p className="text-sm font-medium">Uddannelsesvejleder</p>
                <p className="text-xs text-gray-600">Få rådgivning om din karrierevej</p>
              </button>
              <button className="w-full bg-blue-50 hover:bg-blue-100 p-3 rounded-lg text-left">
                <p className="text-sm font-medium">AI Assistant</p>
                <p className="text-xs text-gray-600">Spørgsmål om procedurer og regler</p>
              </button>
              <button className="w-full bg-purple-50 hover:bg-purple-100 p-3 rounded-lg text-left">
                <p className="text-sm font-medium">Wellness Coach</p>
                <p className="text-xs text-gray-600">Support til trivsel og stress</p>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Karrieremuligheder</h3>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">Tankspecialist</p>
                <p className="text-xs text-gray-600">Kræver 2 yderligere moduler</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm">Uddannelsesinstruktør</p>
                <p className="text-xs text-gray-600">Kræver ledermodul</p>
              </div>
            </div>
          </div>

          {/* Burnout Prevention */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-600" size={20} />
              Burnout Indikatorer
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Emotionel Udmattelse</span>
                  <span className="text-sm font-bold text-green-600">Lav</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${burnoutIndicators.emotional}%`}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Fysisk Udmattelse</span>
                  <span className="text-sm font-bold text-yellow-600">Moderat</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: `${burnoutIndicators.physical}%`}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Mental Udmattelse</span>
                  <span className="text-sm font-bold text-green-600">Lav</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: `${burnoutIndicators.mental}%`}}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">✓ Du er i god form!</p>
              <p className="text-xs text-green-700 mt-1">Fortsæt med at holde en sund balance</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const InstructorDashboard = () => {
    const [sortBy, setSortBy] = useState('progress');
    const [filterStatus, setFilterStatus] = useState('all');
    
    // Mock data for instructor dashboard
    const myRecruits = [
      { 
        id: 1, 
        name: "Jensen, Lars", 
        rank: "Rekrut", 
        startDate: "2024-01-15",
        currentModule: "Køretøjsføring Niveau 2", 
        moduleProgress: 78, 
        overallProgress: 45,
        estimatedCompletion: "2024-03-15",
        status: "on-track",
        lastActivity: "2024-02-20",
        totalModules: 8,
        completedModules: 3,
        currentPhase: "Praktisk Træning",
        nextMilestone: "Køreprøve",
        performance: "excellent",
        attendanceRate: 98,
        avgScore: 89
      },
      { 
        id: 2, 
        name: "Nielsen, Anna", 
        rank: "Rekrut", 
        startDate: "2024-01-10",
        currentModule: "Taktik & Strategi", 
        moduleProgress: 45, 
        overallProgress: 52,
        estimatedCompletion: "2024-04-20",
        status: "at-risk",
        lastActivity: "2024-02-18",
        totalModules: 8,
        completedModules: 4,
        currentPhase: "Teoretisk Fase",
        nextMilestone: "Strategieksamen",
        performance: "needs-attention",
        attendanceRate: 85,
        avgScore: 72
      },
      { 
        id: 3, 
        name: "Hansen, Peter", 
        rank: "Rekrut", 
        startDate: "2024-01-20",
        currentModule: "Førstehjælp Niveau 2", 
        moduleProgress: 92, 
        overallProgress: 38,
        estimatedCompletion: "2024-02-28",
        status: "ahead",
        lastActivity: "2024-02-21",
        totalModules: 8,
        completedModules: 2,
        currentPhase: "Praktisk Certification",
        nextMilestone: "Praktisk Eksamen",
        performance: "excellent",
        attendanceRate: 100,
        avgScore: 94
      },
      { 
        id: 4, 
        name: "Skov, Andreas", 
        rank: "Rekrut", 
        startDate: "2024-01-08",
        currentModule: "Teamwork & Ledelse", 
        moduleProgress: 67, 
        overallProgress: 61,
        estimatedCompletion: "2024-03-30",
        status: "on-track",
        lastActivity: "2024-02-21",
        totalModules: 8,
        completedModules: 5,
        currentPhase: "Ledelses Simulation",
        nextMilestone: "Gruppeledelse Test",
        performance: "good",
        attendanceRate: 92,
        avgScore: 81
      },
      { 
        id: 5, 
        name: "Larsen, Marie", 
        rank: "Rekrut", 
        startDate: "2024-01-25",
        currentModule: "Våbenhåndtering Basis", 
        moduleProgress: 23, 
        overallProgress: 28,
        estimatedCompletion: "2024-05-10",
        status: "behind",
        lastActivity: "2024-02-19",
        totalModules: 8,
        completedModules: 2,
        currentPhase: "Sikkerhedstræning",
        nextMilestone: "Sikkerhedstest",
        performance: "needs-attention",
        attendanceRate: 78,
        avgScore: 68
      }
    ];

    const getStatusColor = (status: string) => {
      switch(status) {
        case 'ahead': return 'bg-green-100 text-green-800 border-green-200';
        case 'on-track': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'at-risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'behind': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    const getStatusText = (status: string) => {
      switch(status) {
        case 'ahead': return 'Foran Plan';
        case 'on-track': return 'På Sporet';
        case 'at-risk': return 'Risiko';
        case 'behind': return 'Bagud';
        default: return 'Ukendt';
      }
    };

    const getPerformanceColor = (performance: string) => {
      switch(performance) {
        case 'excellent': return 'text-green-600';
        case 'good': return 'text-blue-600';
        case 'needs-attention': return 'text-red-600';
        default: return 'text-gray-600';
      }
    };

    const filteredRecruits = myRecruits.filter(recruit => {
      if (filterStatus === 'all') return true;
      return recruit.status === filterStatus;
    }).sort((a, b) => {
      switch(sortBy) {
        case 'progress': return b.overallProgress - a.overallProgress;
        case 'name': return a.name.localeCompare(b.name);
        case 'status': return a.status.localeCompare(b.status);
        default: return 0;
      }
    });

    const statsData = {
      total: myRecruits.length,
      onTrack: myRecruits.filter(r => r.status === 'on-track' || r.status === 'ahead').length,
      atRisk: myRecruits.filter(r => r.status === 'at-risk' || r.status === 'behind').length,
      avgProgress: Math.round(myRecruits.reduce((sum, r) => sum + r.overallProgress, 0) / myRecruits.length)
    };

    return (
      <div className="space-y-6">
        {/* Header and Stats */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="mr-2 text-blue-600" size={20} />
              Mine Rekrutter - Uddannelsesoversigt
            </h3>
            <div className="flex space-x-3">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
                aria-label="Sortér efter"
              >
                <option value="progress">Sortér efter Fremgang</option>
                <option value="name">Sortér efter Navn</option>
                <option value="status">Sortér efter Status</option>
              </select>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
                aria-label="Filtrér status"
              >
                <option value="all">Alle Status</option>
                <option value="ahead">Foran Plan</option>
                <option value="on-track">På Sporet</option>
                <option value="at-risk">Risiko</option>
                <option value="behind">Bagud</option>
              </select>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Total Rekrutter</p>
                  <p className="text-2xl font-bold text-blue-900">{statsData.total}</p>
                </div>
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">På Sporet</p>
                  <p className="text-2xl font-bold text-green-900">{statsData.onTrack}</p>
                </div>
                <Target className="text-green-600" size={24} />
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Kræver Opmærksomhed</p>
                  <p className="text-2xl font-bold text-red-900">{statsData.atRisk}</p>
                </div>
                <AlertTriangle className="text-red-600" size={24} />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Gennemsnitlig Fremgang</p>
                  <p className="text-2xl font-bold text-purple-900">{statsData.avgProgress}%</p>
                </div>
                <BarChart3 className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Recruit Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRecruits.map((recruit) => (
            <div key={recruit.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{recruit.name}</h4>
                  <p className="text-sm text-gray-600">{recruit.rank} • Startet: {recruit.startDate}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(recruit.status)}`}>
                  {getStatusText(recruit.status)}
                </span>
              </div>

              {/* Progress Overview */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Samlet Fremgang</span>
                  <span className="text-sm font-bold text-gray-900">{recruit.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                    style={{width: `${recruit.overallProgress}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>{recruit.completedModules}/{recruit.totalModules} moduler</span>
                  <span>Færdig: {recruit.estimatedCompletion}</span>
                </div>
              </div>

              {/* Current Module */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h5 className="font-semibold text-gray-900 mb-2">Nuværende Modul</h5>
                <p className="text-sm text-gray-700 mb-2">{recruit.currentModule}</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Modul Fremgang</span>
                  <span className="text-xs font-bold">{recruit.moduleProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{width: `${recruit.moduleProgress}%`}}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-gray-600">
                  <span>Fase: {recruit.currentPhase}</span>
                  <span>Næste: {recruit.nextMilestone}</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600">Performance</p>
                  <p className={`text-sm font-bold ${getPerformanceColor(recruit.performance)}`}>
                    {recruit.performance === 'excellent' ? 'Fremragende' : 
                     recruit.performance === 'good' ? 'God' : 'Opmærksomhed'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Fremmøde</p>
                  <p className="text-sm font-bold text-gray-900">{recruit.attendanceRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-600">Gns. Score</p>
                  <p className="text-sm font-bold text-gray-900">{recruit.avgScore}%</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button 
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Se Detaljer
                </button>
                <button className="flex-1 bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-700 transition-colors">
                  Send Besked
                </button>
                {recruit.status === 'at-risk' || recruit.status === 'behind' ? (
                  <button className="bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700 transition-colors">
                    Intervention
                  </button>
                ) : null}
              </div>

              {/* Last Activity */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  Sidst aktiv: {recruit.lastActivity}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions for Instructor */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold mb-4">Instruktør Værktøjer</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-left transition-colors">
              <BookOpen className="text-blue-600 mb-2" size={24} />
              <h5 className="font-semibold text-blue-900">Opret Ny Opgave</h5>
              <p className="text-sm text-blue-700">Tildel nye øvelser til rekrutter</p>
            </button>
            <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-left transition-colors">
              <Award className="text-green-600 mb-2" size={24} />
              <h5 className="font-semibold text-green-900">Evaluér Fremgang</h5>
              <p className="text-sm text-green-700">Vurdér og godkend moduler</p>
            </button>
            <button className="bg-orange-50 hover:bg-orange-100 p-4 rounded-lg text-left transition-colors">
              <MessageCircle className="text-orange-600 mb-2" size={24} />
              <h5 className="font-semibold text-orange-900">Gruppen Chat</h5>
              <p className="text-sm text-orange-700">Kommunikér med hele holdet</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CommandDashboard = () => {
    const [timeframe, setTimeframe] = useState('6months');
    const [selectedUnit, setSelectedUnit] = useState('all');
    
    // Mock data for command dashboard
    const personnelData = [
      { id: 1, name: "Jensen, Lars", rank: "Rekrut", unit: "1. Kompagni", currentModule: "Køretøjsføring Niveau 2", progress: 78, estimatedCompletion: "2024-03-15", specialty: "Tankspecialist", risk: "low" },
      { id: 2, name: "Nielsen, Anna", rank: "Soldat", unit: "2. Kompagni", currentModule: "Taktik & Strategi", progress: 45, estimatedCompletion: "2024-04-20", specialty: "Kommunikation", risk: "medium" },
      { id: 3, name: "Hansen, Peter", rank: "Rekrut", unit: "1. Kompagni", currentModule: "Førstehjælp Niveau 2", progress: 92, estimatedCompletion: "2024-02-28", specialty: "Medicin", risk: "low" },
      { id: 4, name: "Larsen, Marie", rank: "Soldat", unit: "3. Kompagni", currentModule: "Våbenhåndtering Avanceret", progress: 23, estimatedCompletion: "2024-05-10", specialty: "Sikkerhed", risk: "high" },
      { id: 5, name: "Skov, Andreas", rank: "Rekrut", unit: "2. Kompagni", currentModule: "Teamwork & Ledelse", progress: 67, estimatedCompletion: "2024-03-30", specialty: "Ledelse", risk: "low" },
    ];

    const capacityData = {
      current: { total: 145, active: 127, completed: 18 },
      projected: {
        "2024-Q2": { needed: 180, available: 165, gap: -15 },
        "2024-Q3": { needed: 220, available: 195, gap: -25 },
        "2024-Q4": { needed: 200, available: 210, gap: 10 },
        "2025-Q1": { needed: 240, available: 185, gap: -55 }
      }
    };

    const bottlenecks = [
      { area: "Køretøjsføring", currentCapacity: 32, needed: 45, shortage: 13, criticalBy: "Q2 2024" },
      { area: "Taktik & Strategi", currentCapacity: 28, needed: 35, shortage: 7, criticalBy: "Q3 2024" },
      { area: "Medicin", currentCapacity: 15, needed: 25, shortage: 10, criticalBy: "Q1 2025" },
    ];

    const getRiskColor = (risk: string) => {
      switch(risk) {
        case 'high': return 'bg-red-100 text-red-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="space-y-6">
        {/* Header with filters and actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Shield className="mr-2 text-blue-600" size={20} />
              Kommando Center - Strategisk Oversigt
            </h3>
            <div className="flex space-x-3">
              <select 
                value={timeframe} 
                onChange={(e) => setTimeframe(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
                aria-label="Vælg tidsramme"
              >
                <option value="3months">3 Måneder</option>
                <option value="6months">6 Måneder</option>
                <option value="12months">12 Måneder</option>
              </select>
              <select 
                value={selectedUnit} 
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
                aria-label="Vælg enhed"
              >
                <option value="all">Alle Enheder</option>
                <option value="1">1. Kompagni</option>
                <option value="2">2. Kompagni</option>
                <option value="3">3. Kompagni</option>
              </select>
              <button className="flex items-center bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                <Download size={16} className="mr-1" />
                Eksportér
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktive i Uddannelse</p>
                <p className="text-2xl font-bold text-blue-600">{capacityData.current.active}</p>
              </div>
              <Activity className="text-blue-600" size={24} />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUp size={16} className="text-green-500 mr-1" />
              <span className="text-green-600">+12% fra sidste måned</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gennemførte</p>
                <p className="text-2xl font-bold text-green-600">{capacityData.current.completed}</p>
              </div>
              <Award className="text-green-600" size={24} />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-gray-600">Denne måned</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Kritiske Områder</p>
                <p className="text-2xl font-bold text-red-600">{bottlenecks.length}</p>
              </div>
              <AlertTriangle className="text-red-600" size={24} />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-red-600">Kræver opmærksomhed</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Forventet Kapacitet Q2</p>
                <p className="text-2xl font-bold text-orange-600">165</p>
              </div>
              <BarChart3 className="text-orange-600" size={24} />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-orange-600">15 under mål</span>
            </div>
          </div>
        </div>

        {/* Capacity Planning & Future Projections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 text-blue-600" size={20} />
              Kapacitetsfremanskrivning
            </h4>
            <div className="space-y-4">
              {Object.entries(capacityData.projected).map(([quarter, data]) => (
                <div key={quarter} className="border-l-4 border-blue-200 pl-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{quarter}</span>
                    <span className={`px-2 py-1 rounded text-sm ${data.gap >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {data.gap >= 0 ? '+' : ''}{data.gap}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Behov</p>
                      <p className="font-semibold">{data.needed}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tilgængelig</p>
                      <p className="font-semibold">{data.available}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className={`font-semibold ${data.gap >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.gap >= 0 ? 'Overskud' : 'Underskud'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${data.gap >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{width: `${Math.min((data.available / data.needed) * 100, 100)}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-600" size={20} />
              Kritiske Flaskehalse
            </h4>
            <div className="space-y-4">
              {bottlenecks.map((bottleneck, index) => (
                <div key={index} className="border rounded-lg p-4 bg-red-50 border-red-200">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-red-900">{bottleneck.area}</h5>
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-xs">
                      Kritisk: {bottleneck.criticalBy}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-red-700">Nuværende</p>
                      <p className="font-bold text-red-900">{bottleneck.currentCapacity}</p>
                    </div>
                    <div>
                      <p className="text-red-700">Behov</p>
                      <p className="font-bold text-red-900">{bottleneck.needed}</p>
                    </div>
                    <div>
                      <p className="text-red-700">Mangel</p>
                      <p className="font-bold text-red-900">-{bottleneck.shortage}</p>
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700">
                    Opret Handlingsplan
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personnel Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold flex items-center">
              <Users className="mr-2 text-blue-600" size={20} />
              Personel Oversigt ({personnelData.length} aktive)
            </h4>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">Filtrér efter risiko</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Navn</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Rang/Enhed</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Nuværende Modul</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Fremgang</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Forventet Færdig</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Specialisering</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Risiko</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Handling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {personnelData.map((person) => (
                  <tr key={person.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{person.name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">{person.rank}</div>
                      <div className="text-sm text-gray-600">{person.unit}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">{person.currentModule}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{width: `${person.progress}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{person.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar size={16} className="mr-1 text-gray-400" />
                        {person.estimatedCompletion}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {person.specialty}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(person.risk)}`}>
                        {person.risk === 'high' ? 'Høj' : person.risk === 'medium' ? 'Medium' : 'Lav'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                        Se detaljer
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold mb-4">Hurtige Handlinger</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-left">
              <Target className="text-blue-600 mb-2" size={24} />
              <h5 className="font-semibold text-blue-900">Planlæg Ny Uddannelsesrunde</h5>
              <p className="text-sm text-blue-700">Opret og planlæg næste uddannelsescyklus</p>
            </button>
            <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-left">
              <Award className="text-green-600 mb-2" size={24} />
              <h5 className="font-semibold text-green-900">Ressource Optimering</h5>
              <p className="text-sm text-green-700">Analysér og optimér uddannelsesressourcer</p>
            </button>
            <button className="bg-orange-50 hover:bg-orange-100 p-4 rounded-lg text-left">
              <Clock className="text-orange-600 mb-2" size={24} />
              <h5 className="font-semibold text-orange-900">Tidlig Varslingsystem</h5>
              <p className="text-sm text-orange-700">Opsæt automatiske varsler for flaskehalse</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (currentView === 'completed-modules') {
      return <ModuleList modules={moduleData.completed} type="completed" title="Gennemførte Moduler" />;
    }
    if (currentView === 'active-modules') {
      return <ModuleList modules={moduleData.active} type="active" title="Aktive Moduler" />;
    }
    if (currentView === 'module-detail' && selectedModule) {
      const type = moduleData.completed.includes(selectedModule) ? 'completed' : 'active';
      return <ModuleDetail module={selectedModule} type={type} />;
    }
    
    // Dashboard views
    if (activeRole === 'recruit') return <RecruitDashboard />;
    if (activeRole === 'instructor') return <InstructorDashboard />;
    if (activeRole === 'command') return <CommandDashboard />;
    
    return <RecruitDashboard />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <img 
                    src="/MilliSkill%20logo.png" 
                    alt="MilliSkill Logo" 
                    className="h-12 w-auto mr-3"
                    onError={(e) => {
                      console.error('Logo failed to load');
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              
              <div className="hidden md:flex space-x-1">
                <button
                  onClick={() => {setActiveRole('recruit'); setCurrentView('dashboard');}}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeRole === 'recruit' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Rekrut View
                </button>
                <button
                  onClick={() => {setActiveRole('instructor'); setCurrentView('dashboard');}}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeRole === 'instructor' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Instruktør View
                </button>
                <button
                  onClick={() => {setActiveRole('command'); setCurrentView('dashboard');}}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeRole === 'command' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Kommando View
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Search className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
              <Bell className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
              <div className="flex items-center space-x-2">
                <User className="text-gray-400" size={20} />
                <span className="text-sm font-medium text-gray-700">Rekrut Jensen</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentView === 'dashboard' && activeRole === 'recruit' && 'Mit Dashboard'}
            {currentView === 'dashboard' && activeRole === 'instructor' && 'Uddannelsesoversigt'}
            {currentView === 'dashboard' && activeRole === 'command' && 'Kommando Center'}
            {currentView === 'completed-modules' && 'Gennemførte Moduler'}
            {currentView === 'active-modules' && 'Aktive Moduler'}
            {currentView === 'module-detail' && selectedModule?.name}
          </h2>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default MiliSkill; 