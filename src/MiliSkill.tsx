import { useState } from 'react';
import { Target, Shield, Award, BookOpen, MessageCircle, User, TrendingUp, AlertTriangle, Activity, Clock, Star, MapPin, ArrowRight, Zap, Crown, Briefcase, GraduationCap, Navigation } from 'lucide-react';

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

  const CareerPathView = () => {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [showDetailedPath, setShowDetailedPath] = useState<string | null>(null);

    // Current recruit status
    const currentStatus = {
      position: "Rekrut",
      level: 1,
      completedModules: 3,
      totalModules: 8,
      currentSpecialization: "Grundlæggende Træning",
      overallProgress: 65,
      completedCourses: [
        "Grundlæggende Militær Træning",
        "Førstehjælp Niveau 1", 
        "Våbenhåndtering Basis"
      ],
      currentCourses: [
        "Køretøjsføring Niveau 2",
        "Taktik & Strategi"
      ]
    };

    // Career paths data
    const careerPaths = {
      "combat": {
        name: "Kampspecialist",
        icon: Shield,
        color: "red",
        description: "Frontlinje operations og taktisk specialist",
        positions: [
          { id: "combat-1", name: "Soldat", level: 2, requirements: ["Grundlæggende Militær Træning", "Våbenhåndtering Basis"], timeToComplete: "6 måneder" },
          { id: "combat-2", name: "Kampspecialist", level: 3, requirements: ["Taktik & Strategi", "Avanceret Våbentræning"], timeToComplete: "12 måneder" },
          { id: "combat-3", name: "Gruppe Leder", level: 4, requirements: ["Teamwork & Ledelse", "Feltledelse"], timeToComplete: "24 måneder" },
          { id: "combat-4", name: "Sektions Leder", level: 5, requirements: ["Strategisk Planlægning", "Avanceret Ledelse"], timeToComplete: "36 måneder" }
        ]
      },
      "technical": {
        name: "Teknisk Specialist",
        icon: Zap,
        color: "blue",
        description: "Teknologi, vedligeholdelse og ingeniørarbejde",
        positions: [
          { id: "tech-1", name: "Tekniker", level: 2, requirements: ["Grundlæggende Elektronik", "Køretøjsføring"], timeToComplete: "8 måneder" },
          { id: "tech-2", name: "Systemspecialist", level: 3, requirements: ["Avanceret Teknologi", "IT Sikkerhed"], timeToComplete: "16 måneder" },
          { id: "tech-3", name: "Senior Tekniker", level: 4, requirements: ["Projektledelse", "Systemintegration"], timeToComplete: "28 måneder" },
          { id: "tech-4", name: "Teknisk Officer", level: 5, requirements: ["Ingeniør Certificering", "Innovation"], timeToComplete: "42 måneder" }
        ]
      },
      "medical": {
        name: "Medicinsk Specialist",
        icon: Activity,
        color: "green",
        description: "Sundhedspleje og medicinsk støtte",
        positions: [
          { id: "med-1", name: "Sanitets Assistent", level: 2, requirements: ["Førstehjælp Niveau 2", "Medicinsk Grundkursus"], timeToComplete: "10 måneder" },
          { id: "med-2", name: "Feltsygeplejerske", level: 3, requirements: ["Avanceret Medicin", "Krigskirurgi"], timeToComplete: "20 måneder" },
          { id: "med-3", name: "Medicinsk Sergeant", level: 4, requirements: ["Medicinsk Ledelse", "Specialisering"], timeToComplete: "32 måneder" },
          { id: "med-4", name: "Medicinsk Officer", level: 5, requirements: ["Læge Uddannelse", "Militær Medicin"], timeToComplete: "60 måneder" }
        ]
      },
      "intelligence": {
        name: "Efterretnings Specialist",
        icon: Navigation,
        color: "purple",
        description: "Analyse, overvågning og strategisk information",
        positions: [
          { id: "intel-1", name: "Analytiker", level: 2, requirements: ["Data Analyse", "Sikkerhedsclearance"], timeToComplete: "9 måneder" },
          { id: "intel-2", name: "Efterretnings Specialist", level: 3, requirements: ["Avanceret Analyse", "Cyber Sikkerhed"], timeToComplete: "18 måneder" },
          { id: "intel-3", name: "Senior Analytiker", level: 4, requirements: ["Strategisk Analyse", "Ledelsesevner"], timeToComplete: "30 måneder" },
          { id: "intel-4", name: "Efterretnings Officer", level: 5, requirements: ["Strategisk Planlægning", "Tværfaglig Koordination"], timeToComplete: "45 måneder" }
        ]
      },
      "logistics": {
        name: "Logistik Specialist",
        icon: Briefcase,
        color: "orange",
        description: "Forsyning, transport og koordination",
        positions: [
          { id: "log-1", name: "Logistiker", level: 2, requirements: ["Supply Chain", "Køretøjsføring Niveau 2"], timeToComplete: "7 måneder" },
          { id: "log-2", name: "Forsynings Specialist", level: 3, requirements: ["Avanceret Logistik", "Projektkoordinering"], timeToComplete: "15 måneder" },
          { id: "log-3", name: "Logistik Leder", level: 4, requirements: ["Strategisk Planlægning", "Multi-modal Transport"], timeToComplete: "26 måneder" },
          { id: "log-4", name: "Logistik Officer", level: 5, requirements: ["Supply Chain Management", "Strategisk Koordination"], timeToComplete: "38 måneder" }
        ]
      },
      "command": {
        name: "Kommando & Ledelse",
        icon: Crown,
        color: "gold",
        description: "Strategisk ledelse og kommandostrukturer",
        positions: [
          { id: "cmd-1", name: "Korporal", level: 2, requirements: ["Teamwork & Ledelse", "Grundlæggende Kommando"], timeToComplete: "12 måneder" },
          { id: "cmd-2", name: "Sergeant", level: 3, requirements: ["Avanceret Ledelse", "Taktisk Kommando"], timeToComplete: "24 måneder" },
          { id: "cmd-3", name: "Løjtnant", level: 4, requirements: ["Officer Uddannelse", "Strategisk Tænkning"], timeToComplete: "36 måneder" },
          { id: "cmd-4", name: "Kaptajn", level: 5, requirements: ["Avanceret Strategi", "Multi-unit Kommando"], timeToComplete: "48 måneder" }
        ]
      }
    };

    const getPathColor = (pathKey: string, intensity: string = "500") => {
      const colors: {[key: string]: string} = {
        red: intensity === "50" ? "bg-red-50" : intensity === "100" ? "bg-red-100" : intensity === "200" ? "bg-red-200" : "bg-red-500",
        blue: intensity === "50" ? "bg-blue-50" : intensity === "100" ? "bg-blue-100" : intensity === "200" ? "bg-blue-200" : "bg-blue-500",
        green: intensity === "50" ? "bg-green-50" : intensity === "100" ? "bg-green-100" : intensity === "200" ? "bg-green-200" : "bg-green-500",
        purple: intensity === "50" ? "bg-purple-50" : intensity === "100" ? "bg-purple-100" : intensity === "200" ? "bg-purple-200" : "bg-purple-500",
        orange: intensity === "50" ? "bg-orange-50" : intensity === "100" ? "bg-orange-100" : intensity === "200" ? "bg-orange-200" : "bg-orange-500",
        gold: intensity === "50" ? "bg-yellow-50" : intensity === "100" ? "bg-yellow-100" : intensity === "200" ? "bg-yellow-200" : "bg-yellow-500"
      };
      return colors[careerPaths[pathKey as keyof typeof careerPaths]?.color] || "bg-gray-500";
    };

    const getTextColor = (pathKey: string, intensity: string = "700") => {
      const colors: {[key: string]: string} = {
        red: intensity === "600" ? "text-red-600" : "text-red-700",
        blue: intensity === "600" ? "text-blue-600" : "text-blue-700",
        green: intensity === "600" ? "text-green-600" : "text-green-700",
        purple: intensity === "600" ? "text-purple-600" : "text-purple-700",
        orange: intensity === "600" ? "text-orange-600" : "text-orange-700",
        gold: intensity === "600" ? "text-yellow-600" : "text-yellow-700"
      };
      return colors[careerPaths[pathKey as keyof typeof careerPaths]?.color] || "text-gray-700";
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            ← Tilbage til Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <GraduationCap className="mr-3 text-green-600" size={28} />
                Din Karrierevej i Militæret
              </h2>
              <p className="text-gray-600 mt-2">Udforsk dine muligheder og planlæg din karriere</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Nuværende Position</p>
              <p className="text-lg font-bold text-blue-600">{currentStatus.position}</p>
              <p className="text-sm text-gray-500">{currentStatus.overallProgress}% Samlet Fremgang</p>
            </div>
          </div>
        </div>

        {/* Current Status & Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <MapPin className="mr-2 text-blue-600" size={20} />
            Din Nuværende Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <Star className="text-yellow-500 mb-2" size={24} />
              <p className="text-sm text-gray-600">Niveau</p>
              <p className="text-xl font-bold text-gray-900">{currentStatus.level}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <Award className="text-green-500 mb-2" size={24} />
              <p className="text-sm text-gray-600">Gennemførte Moduler</p>
              <p className="text-xl font-bold text-gray-900">{currentStatus.completedModules}/{currentStatus.totalModules}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <Target className="text-blue-500 mb-2" size={24} />
              <p className="text-sm text-gray-600">Specialisering</p>
              <p className="text-sm font-semibold text-gray-900">{currentStatus.currentSpecialization}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <TrendingUp className="text-purple-500 mb-2" size={24} />
              <p className="text-sm text-gray-600">Samlet Fremgang</p>
              <p className="text-xl font-bold text-gray-900">{currentStatus.overallProgress}%</p>
            </div>
          </div>
        </div>

        {/* Career Paths Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(careerPaths).map(([pathKey, path]) => {
            const IconComponent = path.icon;
            const isSelected = selectedPath === pathKey;
            
            return (
              <div 
                key={pathKey}
                onClick={() => setSelectedPath(isSelected ? null : pathKey)}
                className={`${getPathColor(pathKey, "50")} rounded-lg shadow-sm border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  isSelected ? `border-${path.color}-400 shadow-lg scale-105` : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`${getPathColor(pathKey, "100")} p-3 rounded-full mr-4`}>
                    <IconComponent className={getTextColor(pathKey, "600")} size={24} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${getTextColor(pathKey)}`}>{path.name}</h3>
                    <p className="text-sm text-gray-600">{path.description}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Karriere Niveauer:</span>
                    <span className="font-semibold">{path.positions.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Højeste Niveau:</span>
                    <span className="font-semibold">{path.positions[path.positions.length - 1].name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimeret Tid:</span>
                    <span className="font-semibold">{path.positions[path.positions.length - 1].timeToComplete}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDetailedPath(pathKey);
                      }}
                      className={`w-full ${getPathColor(pathKey, "500")} text-white py-2 rounded font-medium hover:opacity-90 transition-opacity`}
                    >
                      Se Detaljeret Vej
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Career Path View */}
        {showDetailedPath && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center">
                <ArrowRight className="mr-2 text-green-600" size={24} />
                Detaljeret Karrierevej: {careerPaths[showDetailedPath as keyof typeof careerPaths].name}
              </h3>
              <button 
                onClick={() => setShowDetailedPath(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Progress Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold mb-4">Din Progression</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3">
                    <Star className="text-yellow-500 mx-auto mb-1" size={20} />
                    <p className="text-xs text-gray-600">Nuværende Niveau</p>
                    <p className="text-lg font-bold">{currentStatus.level}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3">
                    <Award className="text-green-500 mx-auto mb-1" size={20} />
                    <p className="text-xs text-gray-600">Gennemførte Kurser</p>
                    <p className="text-lg font-bold">{currentStatus.completedCourses.length}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3">
                    <BookOpen className="text-blue-500 mx-auto mb-1" size={20} />
                    <p className="text-xs text-gray-600">Aktive Kurser</p>
                    <p className="text-lg font-bold">{currentStatus.currentCourses.length}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white rounded-lg p-3">
                    <Target className="text-purple-500 mx-auto mb-1" size={20} />
                    <p className="text-xs text-gray-600">Samlet Fremgang</p>
                    <p className="text-lg font-bold">{currentStatus.overallProgress}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Qualification Path */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-gray-300"></div>
              
              {/* Current Position */}
              <div className="relative mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-3 mr-6 relative z-10 shadow-lg">
                    <User className="text-white" size={20} />
                  </div>
                  <div className="flex-1 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                    <h4 className="font-bold text-blue-900 mb-2">Din Nuværende Position</h4>
                    <p className="text-blue-700 font-medium">{currentStatus.position}</p>
                    <p className="text-sm text-blue-600 mt-1">Niveau {currentStatus.level} • {currentStatus.overallProgress}% Samlet Fremgang</p>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium text-blue-800 mb-2">Gennemførte Kurser:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentStatus.completedCourses.map((course, idx) => (
                          <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            ✓ {course}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium text-blue-800 mb-2">Nuværende Kurser:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentStatus.currentCourses.map((course, idx) => (
                          <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                            ⏳ {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Career Path Steps */}
              {careerPaths[showDetailedPath as keyof typeof careerPaths].positions.map((position) => {
                const IconComponent = careerPaths[showDetailedPath as keyof typeof careerPaths].icon;
                const isCurrentlyAccessible = currentStatus.level >= position.level - 1;
                const isCompleted = currentStatus.level > position.level;
                const progressPercent = isCompleted ? 100 : isCurrentlyAccessible ? 50 : 0;
                
                return (
                  <div key={position.id} className="relative mb-8">
                    <div className="flex items-start">
                      <div className={`rounded-full p-3 mr-6 relative z-10 transition-all duration-300 shadow-lg ${
                        isCompleted 
                          ? 'bg-green-500' 
                          : isCurrentlyAccessible 
                            ? getPathColor(showDetailedPath, "500") 
                            : 'bg-gray-300'
                      }`}>
                        {isCompleted ? (
                          <Award className="text-white" size={20} />
                        ) : (
                          <IconComponent className={isCurrentlyAccessible ? "text-white" : "text-gray-500"} size={20} />
                        )}
                      </div>
                      
                      <div className={`flex-1 border-l-4 rounded-lg p-4 transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-green-50 border-green-500' 
                          : isCurrentlyAccessible 
                            ? `${getPathColor(showDetailedPath, "50")} border-${careerPaths[showDetailedPath as keyof typeof careerPaths].color}-500` 
                            : 'bg-gray-50 border-gray-300'
                      }`}>
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className={`font-bold text-lg ${
                              isCompleted 
                                ? 'text-green-900' 
                                : isCurrentlyAccessible 
                                  ? getTextColor(showDetailedPath) 
                                  : 'text-gray-600'
                            }`}>
                              {position.name}
                            </h4>
                            <p className="text-sm text-gray-600">Niveau {position.level}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isCompleted 
                                ? 'bg-green-200 text-green-800' 
                                : isCurrentlyAccessible 
                                  ? `${getPathColor(showDetailedPath, "200")} ${getTextColor(showDetailedPath, "600")}` 
                                  : 'bg-gray-200 text-gray-600'
                            }`}>
                              {isCompleted ? 'Gennemført' : isCurrentlyAccessible ? 'Tilgængelig' : 'Låst'}
                            </span>
                          </div>
                        </div>

                        {/* Progress bar for this position */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Fremgang til denne position</span>
                            <span className="font-medium">{progressPercent}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isCompleted ? 'bg-green-500' : isCurrentlyAccessible ? 'bg-blue-500' : 'bg-gray-400'
                              }`}
                              style={{width: `${progressPercent}%`}}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Påkrævede Kvalifikationer:</p>
                            <ul className="space-y-1">
                              {position.requirements.map((req, idx) => {
                                const isRequirementMet = currentStatus.completedCourses.includes(req) || 
                                                        currentStatus.currentCourses.includes(req);
                                return (
                                  <li key={idx} className="flex items-center text-sm">
                                    <div className={`w-2 h-2 rounded-full mr-2 ${
                                      isRequirementMet ? 'bg-green-500' : 'bg-gray-400'
                                    }`}></div>
                                    <span className={isRequirementMet ? 'text-green-700 font-medium' : 'text-gray-600'}>
                                      {req}
                                    </span>
                                    {isRequirementMet && <span className="ml-2 text-green-600 text-xs">✓</span>}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Estimeret Tid:</p>
                            <p className="text-sm text-gray-600 flex items-center mb-3">
                              <Clock size={14} className="mr-1" />
                              {position.timeToComplete}
                            </p>
                            
                            {isCurrentlyAccessible && !isCompleted && (
                              <button className={`w-full ${getPathColor(showDetailedPath, "500")} text-white py-2 px-4 rounded font-medium hover:opacity-90 transition-opacity`}>
                                Start Uddannelse til {position.name}
                              </button>
                            )}
                            
                            {isCompleted && (
                              <div className="bg-green-100 border border-green-300 rounded p-2">
                                <p className="text-green-800 text-sm font-medium">✓ Position Opnået</p>
                                <p className="text-green-600 text-xs">Du har kvalifikationerne til denne rolle</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="border-t pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className={`${getPathColor(showDetailedPath, "500")} text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity`}>
                  Planlæg Min Uddannelse
                </button>
                <button className="bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                  Tal med Karriererådgiver
                </button>
                <button className="bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Se Tilgængelige Kurser
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Næste Skridt</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-left transition-colors">
              <BookOpen className="text-blue-600 mb-2" size={24} />
              <h5 className="font-semibold text-blue-900">Karriererådgivning</h5>
              <p className="text-sm text-blue-700">Book en samtale med en karriererådgiver</p>
            </button>
            <button className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-left transition-colors">
              <Target className="text-green-600 mb-2" size={24} />
              <h5 className="font-semibold text-green-900">Sæt Karrieremål</h5>
              <p className="text-sm text-green-700">Definer dine langsigtede mål</p>
            </button>
            <button className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-left transition-colors">
              <Award className="text-purple-600 mb-2" size={24} />
              <h5 className="font-semibold text-purple-900">Se Certificeringer</h5>
              <p className="text-sm text-purple-700">Udforsk tilgængelige certificeringer</p>
            </button>
            <button className="bg-orange-50 hover:bg-orange-100 p-4 rounded-lg text-left transition-colors">
              <MessageCircle className="text-orange-600 mb-2" size={24} />
              <h5 className="font-semibold text-orange-900">Mentor Netværk</h5>
              <p className="text-sm text-orange-700">Find en mentor i dit fagområde</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const InstructorDashboard = () => {
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

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Mine Rekrutter</h3>
          <div className="space-y-3">
            {myRecruits.map((recruit) => (
              <div key={recruit.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{recruit.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(recruit.status)}`}>
                    {getStatusText(recruit.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{recruit.currentModule}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${recruit.overallProgress}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const CommandDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Kommando Center</h3>
          <p>Strategisk oversigt og planlægning</p>
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
    if (currentView === 'career-path') {
      return <CareerPathView />;
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
                <button
                  onClick={() => setCurrentView('career-path')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    currentView === 'career-path' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Karrierevej
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <User className="text-gray-400" size={20} />
              <span className="text-sm font-medium text-gray-700">Rekrut Jensen</span>
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
            {currentView === 'career-path' && 'Karrierevej'}
          </h2>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default MiliSkill; 